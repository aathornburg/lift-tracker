import { Injectable, QueryList } from '@angular/core';
import { StepComponent } from '../components/step/step.component';

@Injectable()
export class StepService {

  steps: QueryList<StepComponent>;
  activeStep: StepComponent;

  constructor() { }

  initSteps(steps: QueryList<StepComponent>): void {
    this.steps = steps;
    this.showStep(this.steps.first);
  }

  showStep(step: StepComponent): void {
    if (this.activeStep) {
      this.activeStep.setAsInactive();
    }
    step.setAsActive();
  }
}
