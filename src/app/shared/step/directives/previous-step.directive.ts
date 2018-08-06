import { Directive, Input, HostListener } from '@angular/core';
import { StepService } from '../services/step.service';

@Directive({
  selector: '[ltPreviousStep]'
})
export class PreviousStepDirective {

  constructor(private stepService: StepService) { }

  @HostListener('click')
  onElementClick(): void {
    this.stepService.goToPreviousStep();
  }

}
