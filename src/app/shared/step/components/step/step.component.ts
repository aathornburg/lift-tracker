import { Component, HostBinding, ElementRef, OnInit } from '@angular/core';
import { StepService } from '../../services/step.service';
import { FocusService } from '../../../focus/services/focus.service';

@Component({
  selector: 'lt-step',
  template: '<ng-content></ng-content>',
  styles: [ ':host { flex-shrink: 0; width: 100% }']
})
export class StepComponent implements OnInit {

  @HostBinding('style.visibility') visibility;

  constructor(private stepService: StepService, private focusService: FocusService, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.hide();
  }

  show(): void {
    this.visibility = 'visible';
    this.focusService.allowFocusForFocusableElements(this.elementRef.nativeElement);
  }

  hide(): void {
    this.visibility = 'hidden';
    this.focusService.preventFocusForFocusableElements(this.elementRef.nativeElement);
  }

}
