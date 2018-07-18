import { Component, Input } from '@angular/core';
import { Lift } from 'src/app/model/Lift';

@Component({
  selector: 'lt-lift',
  templateUrl: './lift.component.html',
  styleUrls: ['./lift.component.scss']
})
export class LiftComponent {

  @Input() lift: Lift;

  constructor() { }

  weightDown(): void {

  }

  weightUp(): void {

  }

  remove(): void {

  }

}
