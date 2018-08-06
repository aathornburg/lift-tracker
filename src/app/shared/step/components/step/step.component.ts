import { Component, HostBinding } from '@angular/core';
import { StepService } from '../../services/step.service';

@Component({
  selector: 'lt-step',
  template: '<ng-content></ng-content>'
})
export class StepComponent {

  @HostBinding('hidden') hidden = true;

  constructor(private stepService: StepService) { }

  setAsActive(): void {
    this.hidden = false;
  }

  setAsInactive(): void {
    this.hidden = true;
  }

}
