import { Injectable } from '@angular/core';
import { StepComponent } from '../components/step/step.component';
import { StepGroupComponent } from '../components/step-group/step-group.component';

@Injectable()
export class StepService {

  stepGroup: StepGroupComponent;
  steps: StepComponent[];
  activeStep: StepComponent;
  activeIndex: number;

  constructor() { }

  public initSteps(stepGroup: StepGroupComponent, initialIndex?: number): void {
    this.stepGroup = stepGroup;
    this.steps = stepGroup.stepComponents.toArray();
    this.activeIndex = initialIndex ? initialIndex : 0;
    this.showStep(this.steps[this.activeIndex]);
  }

  private showStep(newStep: StepComponent): void {
    const newIndex = this.steps.indexOf(newStep);
    this.steps
      .filter((step, index) => this.indexContainedInBoundary(index, newIndex, this.activeIndex))
      .forEach(step => step.show());

    this.stepGroup.setIndexOffset(100 * this.determineIfLeftShift(newIndex) * newIndex);
    this.activeStep = newStep;
  }

  public goToNextStepPostAnimation(): void {
    const newIndex = this.steps.indexOf(this.activeStep);
    this.steps
      .filter((step, index) => this.indexContainedInBoundary(index, newIndex, this.activeIndex))
      .forEach(step => { if (step !== this.activeStep) { step.hide(); }});

    this.activeIndex = newIndex;
  }

  private indexContainedInBoundary(index, boundary1, boundary2): boolean { // inclusive
    return ((index >= boundary1) && (index <= boundary2)) || ((index >= boundary2) && (index <= boundary1))
  }

  private determineIfLeftShift(newIndex: number): number {
    return newIndex > this.activeIndex ? -1 : 1;
  }

  public goToNextStep(): void {
    if (this.indexIsValid(this.activeIndex + 1)) {
      this.showStep(this.steps[this.activeIndex + 1]);
    }
  }

  public goToPreviousStep(): void {
    if (this.indexIsValid(this.activeIndex - 1)) {
      this.showStep(this.steps[this.activeIndex - 1]);
    }
  }

  private indexIsValid(index: number) {
    return index >= 0 && index < this.steps.length;
  }
}
