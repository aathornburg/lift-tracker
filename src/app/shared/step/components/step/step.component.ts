import { Component, HostBinding, ElementRef, HostListener } from '@angular/core';
import { StepService } from '../../services/step.service';
import { FocusService } from '../../../focus/services/focus.service';

@Component({
  selector: 'lt-step',
  template: '<ng-content></ng-content>',
  styles: [ ':host { flex-shrink: 0; width: 100% }']
})
export class StepComponent {

  @HostBinding('style.visibility') visibility = 'hidden';

  constructor(private stepService: StepService, private focusService: FocusService, private elementRef: ElementRef) { }

  show(): void {
    this.visibility = 'visible';
  }

  hide(): void {
    this.visibility = 'hidden';
  }

  @HostListener('focusout', ['$event'])
  onElementFocusOut(event: any): void {
    this.focusService.trapFocus(event, this.elementRef.nativeElement);
  }

}
