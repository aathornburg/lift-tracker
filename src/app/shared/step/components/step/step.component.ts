import { Component, HostBinding, HostListener } from '@angular/core';
import { StepService } from '../../services/step.service';

@Component({
  selector: 'lt-step',
  template: '<ng-content></ng-content>',
  styles: [ ':host { flex-shrink: 0; width: 100% }'],
  // animations: [ SlideLeftRight ]
})
export class StepComponent {

  // animationState = 'closed';
  @HostBinding('hidden') hidden = true;
  // @HostBinding('@slideLeftRight') get slideLeftRight() {
  //   return { value: this.animationState };
  // }

  constructor(private stepService: StepService) { }

  show(): void {
    this.hidden = false;
    // this.animationState = 'visible';
  }

  hide(): void {
    this.hidden = true;
    // this.animationState = 'closing';
  }

  // @HostListener('@slideLeftRight.done')
  // onAnimationDone(): void {
  //   if (this.animationState === 'closing') {
  //     this.hidden = true;
  //     this.animationState = 'closed';
  //   }
  // }

}
