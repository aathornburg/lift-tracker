import { Component, OnInit, Input, EventEmitter, Output, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { TooltipDirection } from 'src/app/shared/tooltip/model/tooltip-direction';
import { fadeShrinkInOut, expand, shrink, circleExpand, positionCircle, fadeInOut } from '../../workouts.animations';

@Component({
  selector: 'lt-workout-day',
  templateUrl: './workout-day.component.html',
  styleUrls: ['./workout-day.component.scss'],
  animations: [
    fadeShrinkInOut,
    expand,
    shrink,
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
  }

}
