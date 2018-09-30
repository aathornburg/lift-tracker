import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lt-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss']
})
export class WorkoutsComponent implements OnInit {

  trackWorkoutStepsIdentifier: string = "track-workout-steps";

  constructor() { }

  ngOnInit() {
  }

}
