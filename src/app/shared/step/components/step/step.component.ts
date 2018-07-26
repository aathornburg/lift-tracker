import { Component } from '@angular/core';
import { StepService } from '../../services/step.service';

@Component({
  selector: 'lt-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent {

  active = false;

  constructor(private stepService: StepService) { }

  setAsActive(): void {
    this.active = true;
  }

  setAsInactive(): void {
    this.active = false;
  }

}
