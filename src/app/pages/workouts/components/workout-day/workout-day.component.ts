import { Component, OnInit, Input, EventEmitter, Output, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { TooltipDirection } from 'src/app/shared/tooltip/model/tooltip-direction';
import { fadeShrinkInOut, expand, shrink, circleExpand, positionCircle, fadeInOut, expandButton } from '../../workouts.animations';

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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.workoutDayForm = this.formBuilder.group({
      restDay: false,
      exercises: this.formBuilder.array([])
    });

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

  /* Animation Control */
  private setCircleAnimationState(): void {
    console.log(this.circleAnimationState);
    
    this.circleAnimationState = this.workoutDayForm.controls.restDay.value ? 'bottomOpen' :
                                                 this.exerciseInputDisplay ? 'topOpen' :
                                                                             'none';

    console.log(this.circleAnimationState);
  }

  private updateOpenCircleAnimationState(): void {
    // console.log(this.circleAnimationState);

    // Only update the value on open of the circle
    // if (this.workoutDayForm.controls.restDay.value || this.exerciseInputDisplay) {
    //   if (this.circleAnimationState === 'bottomClosed') {
    //     this.circleAnimationState = 'bottomOpen';
    //   } else if (this.circleAnimationState === 'topClosed') {
    //     this.circleAnimationState = 'topOpen';
    //   }
    // } else {
    //   if (this.circleAnimationState === 'bottomClosed' || this.circleAnimationState === 'topClosed') {
    //     this.circleAnimationState = 'none';
    //   }
    // }

    // console.log(this.circleAnimationState);
  }

}
