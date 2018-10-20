import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lt-workout-day',
  templateUrl: './workout-day.component.html',
  styleUrls: ['./workout-day.component.scss']
})
export class WorkoutDayComponent implements OnInit {

  @Input() day: string;

  constructor() { }

  ngOnInit() {
  }

}
