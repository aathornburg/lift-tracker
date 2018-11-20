import { Directive, Input, HostListener } from '@angular/core';
import { StepService } from '../services/step.service';

@Directive({
  selector: '[ltNextStep]'
})
export class NextStepDirective {

  @Input() forStepGroup: string;

  constructor(private stepService: StepService) { }

  @HostListener('click')
  onElementClick(): void {
    this.stepService.showNextStep.next(this.forStepGroup);
  }

}
