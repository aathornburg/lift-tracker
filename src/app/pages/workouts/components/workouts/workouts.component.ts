import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { slideUpDown } from '../../workouts.animations';

@Component({
  selector: 'lt-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss'],
  animations: [ slideUpDown ]
})
export class WorkoutsComponent implements OnInit {

  trackWorkoutStepsIdentifier = 'track-workout-steps';
  trackWorkoutForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.trackWorkoutForm = this.formBuilder.group({
      workoutName: '',
      workoutCadenceWeekly: true
    });
  }

  childFormInitialized(name: string, form: FormGroup): void {
    this.trackWorkoutForm.setControl(name, form);
  }

}
