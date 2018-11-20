import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class StepService {

  showNextStep: BehaviorSubject<string> = new BehaviorSubject<string>('');
  showPreviousStep: BehaviorSubject<string> = new BehaviorSubject<string>('');
  showStep: BehaviorSubject<any> = new BehaviorSubject<object>({});

  constructor() { }

  // goToStep(stepIdentifier: string, stepIndex: number): void {
  //   this.showStep.emit({stepIdentifier, stepIndex});
  // }
}
