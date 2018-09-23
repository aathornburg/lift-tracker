import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class StepService {

  showNextStep: EventEmitter<string> = new EventEmitter<string>();
  showPreviousStep: EventEmitter<string> = new EventEmitter<string>();
  showStep: EventEmitter<object> = new EventEmitter<object>();

  constructor() { }

  goToNextStep(stepIdentifier: string): void {
    this.showNextStep.emit(stepIdentifier);
  }

  goToPreviousStep(stepIdentifier: string): void {
    this.showPreviousStep.emit(stepIdentifier);
  }

  goToStep(stepIdentifier: string, stepIndex: number): void {
    this.showStep.emit({stepIdentifier, stepIndex});
  }
}
