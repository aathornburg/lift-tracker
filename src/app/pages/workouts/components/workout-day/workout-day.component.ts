import { Component, OnInit, Input, EventEmitter, Output, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { TooltipDirection } from 'src/app/shared/tooltip/model/tooltip-direction';
import { fadeShrinkInOut, expand, shrink, circleExpand, positionCircle, fadeInOut, expandButton } from '../../workouts.animations';
import { DropdownService } from 'src/app/shared/overlay/dropdown/services/dropdown.service';
import { DropdownStatus } from 'src/app/shared/overlay/dropdown/model/dropdown-status';

@Component({
  selector: 'lt-workout-day',
  templateUrl: './workout-day.component.html',
  styleUrls: ['./workout-day.component.scss'],
  animations: [
    fadeShrinkInOut,
    expand,
    shrink,
    expandButton,
    circleExpand,
    positionCircle,
    fadeInOut
  ]
})
export class WorkoutDayComponent implements OnInit {

  @Input() day: string;
  @Output() formReady: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  private workoutDayForm: FormGroup;
  private TooltipDirection = TooltipDirection; // For the template
  private exerciseInputDisplay: boolean = false;
  private circleAnimationState: string = 'none';
  private blockQuickOptionsTooltip: boolean = false;
  private currentExerciseIndex: number = 0;

  constructor(private formBuilder: FormBuilder, private dropdownService: DropdownService) { }

  ngOnInit(): void {
    this.workoutDayForm = this.formBuilder.group({
      restDay: false,
      exercises: this.formBuilder.array([])
    });

    this.addExercise();

    this.formReady.emit(this.workoutDayForm);
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
    this.workoutDayForm.controls.restDay.setValue(!this.workoutDayForm.controls.restDay.value);

    if (this.workoutDayForm.controls.restDay.value) {
      this.exerciseInputDisplay = false;
    }

    this.setCircleAnimationState();
  }

  private toggleExerciseInputDisplay(): void {
    this.exerciseInputDisplay = !this.exerciseInputDisplay;
    this.setCircleAnimationState();
  }

  private getDropdownIdentifier(): string {
    return this.day.toLowerCase() + 'QuickOptionsDropdown';
  }

  private handleQuickOptionsDropdownStatusChange(event: DropdownStatus) {
    this.blockQuickOptionsTooltip = (event === DropdownStatus.Open);
  }

  /* Animation Control */
  private setCircleAnimationState(): void {
    this.circleAnimationState = this.workoutDayForm.controls.restDay.value ? 'bottomOpen' :
                                                 this.exerciseInputDisplay ? 'topOpen' :
                                                                             'none';
  }

}
