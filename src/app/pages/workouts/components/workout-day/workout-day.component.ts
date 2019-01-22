import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, AbstractControl } from '@angular/forms';
import { fadeShrinkInOut, circleExpand, positionCircle, fadeInOut, expandButton, smoothHeight, moveDownShrink } from '../../workouts.animations';
import { DropdownService } from 'src/app/shared/overlay/dropdown/services/dropdown.service';
import { DropdownStatus } from 'src/app/shared/overlay/dropdown/model/dropdown-status';
import { WorkoutDayState } from '../../model/workout-day-state';
import { ExerciseService } from 'src/app/pages/exercises/services/exercise.service';
import { Exercise } from 'src/app/pages/exercises/model/exercise';
import { ReplaySubject } from 'rxjs';
import { Direction } from 'src/app/shared/model/direction';

@Component({
  selector: 'lt-workout-day',
  templateUrl: './workout-day.component.html',
  styleUrls: ['./workout-day.component.scss'],
  animations: [
    fadeShrinkInOut,
    expandButton,
    circleExpand,
    positionCircle,
    fadeInOut,
    smoothHeight,
    moveDownShrink
  ]
})
export class WorkoutDayComponent implements OnInit, AfterViewInit {

  @Input() day: string;
  @Output() formReady: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @ViewChild('workoutDayInputContent') workoutDayInputContent: ElementRef;
  @ViewChild('workoutDayButtons') workoutDayButtons: ElementRef;
  private WorkoutDayState = WorkoutDayState; // For the template
  private Direction = Direction; // For the template
  private workoutDayForm: FormGroup;
  private circleAnimationState: string = 'none';
  private blockQuickOptionsTooltip: boolean = false;
  private currentExerciseIndex: number = 0;
  private oldWorkoutDayContentHeight: number = 0;
  private workoutDayContentHeight: number = 0;
  private workoutDayHeightChangeTrigger: boolean = false;
  private workoutDayContentStandardHeight: number = 0;
  private workoutDayContentShrunkenHeight: number = 0;
  private oldWorkoutDayState: WorkoutDayState = WorkoutDayState.Standard;
  private workoutDayState: WorkoutDayState = WorkoutDayState.Standard;
  private workoutDayHeightAnimating = false;
  private moveActiveSelection: ReplaySubject<Direction> = new ReplaySubject<Direction>();
  private originalExerciseInputValue: string;

  constructor(private formBuilder: FormBuilder,
              private exerciseService: ExerciseService,
              private dropdownService: DropdownService) { }

  ngOnInit(): void {
    this.workoutDayForm = this.formBuilder.group({
      restDay: false,
      exercises: this.formBuilder.array(Array<Exercise>())
    });

    this.addExercise();

    this.formReady.emit(this.workoutDayForm);

    // this.exerciseService.getExercises('test').then(
    //   (exercises: Array<Exercise>) => {
    //     console.log(exercises);
    //   }
    // );
  }

  ngAfterViewInit(): void {
    this.workoutDayContentStandardHeight = this.workoutDayButtons.nativeElement.clientHeight;
    this.workoutDayContentShrunkenHeight = this.workoutDayContentStandardHeight * ( 2 / 3 );
    setTimeout(() => { // Fix ExpressionChangedAfterItHasBeenCheckedError
      this.workoutDayContentHeight = this.workoutDayContentStandardHeight;
      this.oldWorkoutDayContentHeight = this.workoutDayContentStandardHeight;
    }, 0);
  }

  private addExercise(): void {
    const exercises = this.workoutDayForm.controls.exercises as FormArray;
    exercises.push(this.createExercise());
  }

  private createExercise(): FormGroup {
    return this.formBuilder.group(new Exercise());
  }

  private getExercisesFromExerciseInput(): void {
    this.exerciseService.getExercises(
      this.workoutDayForm.controls.exercises.value[this.currentExerciseIndex].name
    ).then((exercises: Array<Exercise>) => {
      // this.dropdownExercises = exercises;
    });
  }

  private toggleRestDay(): void {
    this.saveOldWorkoutDayState();

    if (this.workoutDayState !== WorkoutDayState.RestDay) {
      this.workoutDayState = WorkoutDayState.RestDay;
      this.setWorkoutDayContentHeight(this.workoutDayContentShrunkenHeight);
      this.workoutDayForm.controls.restDay.setValue(true);
    } else {
      this.workoutDayState = WorkoutDayState.Standard;
      this.setWorkoutDayContentHeight(this.workoutDayContentStandardHeight);
      this.workoutDayForm.controls.restDay.setValue(false);
    }

    this.workoutDayHeightAnimating = true;

    this.setCircleAnimationState();
  }

  private toggleExerciseInputDisplay(): void {
    this.saveOldWorkoutDayState();

    if (this.workoutDayState !== WorkoutDayState.ExerciseInput) {
      this.workoutDayState = WorkoutDayState.ExerciseInput;
      if (this.workoutDayInputContent.nativeElement.clientHeight > this.workoutDayContentStandardHeight) {
        this.setWorkoutDayContentHeight(this.workoutDayInputContent.nativeElement.clientHeight);
      } else {
        this.setWorkoutDayContentHeight(this.workoutDayContentStandardHeight);
      }
    } else {
      this.workoutDayState = WorkoutDayState.Standard;
      this.setWorkoutDayContentHeight(this.workoutDayContentStandardHeight);
    }

    this.workoutDayHeightAnimating = true;

    this.setCircleAnimationState();
  }

  private setWorkoutDayContentHeight(newHeight: number): void {
    this.oldWorkoutDayContentHeight = this.workoutDayContentHeight;
    this.workoutDayContentHeight = newHeight;
    this.workoutDayHeightChangeTrigger = !this.workoutDayHeightChangeTrigger;
  }

  private saveOldWorkoutDayState(): void {
    this.oldWorkoutDayState = this.workoutDayState;
  }

  private getDropdownIdentifier(dropdownName: string): string {
    return this.day.toLowerCase() + dropdownName;
  }

  private handleQuickOptionsDropdownStatusChange(event: DropdownStatus) {
    this.blockQuickOptionsTooltip = (event === DropdownStatus.Open);
  }

  private updateWorkoutDayContentHeightState(): void {
    this.workoutDayHeightAnimating = false;
  }

  private getSectionStyle(workoutDayState: WorkoutDayState): object {
    return {
      'visibility': this.workoutDayState === workoutDayState || (this.oldWorkoutDayState === workoutDayState && this.workoutDayHeightAnimating) ? 'visible' : 'hidden',
      'position': (this.workoutDayState === workoutDayState && !this.workoutDayHeightAnimating) || (this.oldWorkoutDayState === workoutDayState && this.workoutDayHeightAnimating) ? 'relative' : 'absolute'
    };
  }

  private exerciseNameSelected(activeSelectionObject: any) {
    if (activeSelectionObject.onInput) {
      const exercise = (<FormArray>this.workoutDayForm.controls.exercises).at(this.currentExerciseIndex);
      exercise.patchValue({name: this.originalExerciseInputValue});
    } else if (activeSelectionObject.name) {
      const exercise = (<FormArray>this.workoutDayForm.controls.exercises).at(this.currentExerciseIndex);
      exercise.patchValue({name: activeSelectionObject.name});
    }
  }

  private updateOriginalExerciseInputValue(): void {
    this.originalExerciseInputValue = this.workoutDayForm.controls.exercises.value[this.currentExerciseIndex].name;
  }

  // private updateCurrentExerciseSetNumber(incremented: boolean): void {
  //   const exercise: AbstractControl = (<FormArray>this.workoutDayForm.controls.exercises).at(this.currentExerciseIndex);
  //   const setNumber: number = exercise.value.sets;
  //   exercise.patchValue({name: exerciseName});
  // }

  /* Animation Control */
  private setCircleAnimationState(): void {
    this.circleAnimationState = this.workoutDayState === WorkoutDayState.RestDay ? 'bottomOpen' :
                          this.workoutDayState === WorkoutDayState.ExerciseInput ? 'topOpen' :
                                                                                   'none';
  }

}
