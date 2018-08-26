import { Component, HostBinding, HostListener } from '@angular/core';
import { StepService } from '../../services/step.service';

@Component({
  selector: 'lt-step',
  template: '<ng-content></ng-content>',
  styles: [ ':host { flex-shrink: 0; width: 100% }'],
  // animations: [ SlideLeftRight ]
})
export class StepComponent {

  @HostBinding('style.visibility') visibility = 'hidden';

  constructor(private stepService: StepService) { }

  show(): void {
    this.visibility = 'visible';
  }

  hide(): void {
    this.visibility = 'hidden';
  }

}
