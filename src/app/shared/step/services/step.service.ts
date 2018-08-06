import { Injectable, QueryList } from '@angular/core';
import { StepComponent } from '../components/step/step.component';

@Injectable()
export class StepService {

  steps: StepComponent[];
  activeStep: StepComponent;
  activeIndex: number;

  constructor() { }

  initSteps(steps: StepComponent[]): void {
    this.steps = steps;
    this.showStep(this.steps[0]);
  }

  showStep(step: StepComponent): void {
    if (this.activeStep) {
      this.activeStep.setAsInactive();
    }
    step.setAsActive();
    this.activeStep = step;
    this.activeIndex = this.steps.indexOf(step);
  }

  goToNextStep(): void {
    if (this.indexIsValid(this.activeIndex + 1)) {
      this.showStep(this.steps[this.activeIndex + 1]);
    }
  }

  goToPreviousStep(): void {
    if (this.indexIsValid(this.activeIndex - 1)) {
      this.showStep(this.steps[this.activeIndex - 1]);
    }
  }

  indexIsValid(index: number) {
    return index >= 0 && index < this.steps.length;
  }
}
