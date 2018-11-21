import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { TooltipDirection } from 'src/app/shared/tooltip/model/tooltip-direction';
import { fadeShrinkInOut, circleExpand, positionCircle, fadeInOut, expandButton, smoothHeight } from '../../workouts.animations';
import { DropdownService } from 'src/app/shared/overlay/dropdown/services/dropdown.service';
import { DropdownStatus } from 'src/app/shared/overlay/dropdown/model/dropdown-status';
import { WorkoutDayState } from '../../model/workout-day-state';

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
    smoothHeight
  ]
})
export class WorkoutDayComponent implements OnInit, AfterViewInit {

  @Input() day: string;
  @Output() formReady: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @ViewChild('workoutDayInputContent') workoutDayInputContent: ElementRef;
  @ViewChild('workoutDayButtons') workoutDayButtons: ElementRef;
  private WorkoutDayState = WorkoutDayState; // For the template
  private TooltipDirection = TooltipDirection; // For the template
  private workoutDayForm: FormGroup;
  private circleAnimationState: string = 'none';
  private blockQuickOptionsTooltip: boolean = false;
  private currentExerciseIndex: number = 0;
  private workoutDayContentHeight: number = 0;
  private workoutDayContentStandardHeight: number = 0;
  private workoutDayContentShrunkenHeight: number = 0;
  private oldWorkoutDayState: WorkoutDayState = WorkoutDayState.Standard;
  private workoutDayState: WorkoutDayState = WorkoutDayState.Standard;
  private workoutDayHeightAnimating = false;

  constructor(private formBuilder: FormBuilder, private dropdownService: DropdownService) { }

  ngOnInit(): void {
    this.workoutDayForm = this.formBuilder.group({
      restDay: false,
      exercises: this.formBuilder.array([])
    });

    this.addExercise();

    this.formReady.emit(this.workoutDayForm);
  }
  
  ngAfterViewInit(): void {
    this.workoutDayContentStandardHeight = this.workoutDayButtons.nativeElement.clientHeight;
    this.workoutDayContentShrunkenHeight = this.workoutDayContentStandardHeight * ( 2 / 3 );
  }

  private addExercise(): void {
    // (this.workoutDayForm.controls.exercises as FormArray).push(this.createExercise());
    const exercises = this.workoutDayForm.controls.exercises as FormArray;
    exercises.push(this.createExercise());
  }

  private createExercise(name?: string, sets?: number): FormGroup {
    return this.formBuilder.group({
      name: name ? name : '',
      sets: sets ? sets : 0
    });
  }

  private toggleRestDay(): void {
    this.saveOldWorkoutDayState();

    if (this.workoutDayState !== WorkoutDayState.RestDay) {
      this.workoutDayState = WorkoutDayState.RestDay;
      this.workoutDayContentHeight = this.workoutDayContentShrunkenHeight;
      this.workoutDayForm.controls.restDay.setValue(true);
    } else {
      this.workoutDayState = WorkoutDayState.Standard;
      this.workoutDayContentHeight = this.workoutDayContentStandardHeight;
      this.workoutDayForm.controls.restDay.setValue(false);
    }

    this.workoutDayHeightAnimating = true;

    this.setCircleAnimationState();
  }

  private toggleExerciseInputDisplay(): void {
    this.saveOldWorkoutDayState();

    if (this.workoutDayState !== WorkoutDayState.ExerciseInput) {
      this.workoutDayState = WorkoutDayState.ExerciseInput;
      this.workoutDayContentHeight = this.workoutDayInputContent.nativeElement.clientHeight;
    } else {
      this.workoutDayState = WorkoutDayState.Standard;
      this.workoutDayContentHeight = this.workoutDayContentStandardHeight;
    }

    this.workoutDayHeightAnimating = true;

    this.setCircleAnimationState();
  }

  private saveOldWorkoutDayState(): void {
    this.oldWorkoutDayState = this.workoutDayState;
  }

  private getDropdownIdentifier(): string {
    return this.day.toLowerCase() + 'QuickOptionsDropdown';
  }

  private handleQuickOptionsDropdownStatusChange(event: DropdownStatus) {
    this.blockQuickOptionsTooltip = (event === DropdownStatus.Open);
  }

  private updateWorkoutDayContentHeightState() {
    console.log('test');
    this.workoutDayHeightAnimating = false;
  }

  private getSectionStyle(workoutDayState: WorkoutDayState): object {
    return {
      'visibility': this.workoutDayState === workoutDayState || (this.oldWorkoutDayState === workoutDayState && this.workoutDayHeightAnimating) ? 'visible' : 'hidden',
      'position': (this.workoutDayState === workoutDayState && !this.workoutDayHeightAnimating) || (this.oldWorkoutDayState === workoutDayState && this.workoutDayHeightAnimating) ? 'relative' : 'absolute'
    }
  }

  /* Animation Control */
  private setCircleAnimationState(): void {
    this.circleAnimationState = this.workoutDayState === WorkoutDayState.RestDay ? 'bottomOpen' :
                          this.workoutDayState === WorkoutDayState.ExerciseInput ? 'topOpen' :
                                                                                   'none';
  }

}
