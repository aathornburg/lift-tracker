import { Component, AfterContentInit, ContentChildren, QueryList, Input } from '@angular/core';
import { StepService } from '../../services/step.service';
import { StepComponent } from '../step/step.component';
import { SlideLeftRight } from '../step.animations';

@Component({
  selector: 'lt-step-group',
  templateUrl: './step-group.component.html',
  styleUrls: ['./step-group.component.scss'],
  animations: [ SlideLeftRight ]
})
export class StepGroupComponent implements AfterContentInit {

  @ContentChildren(StepComponent) stepComponents: QueryList<StepComponent>;
  @Input() stepIdentifier: string;
  @Input() startingIndex = 0;
  private indexOffset: number;
  private activeIndex: number;
  private nextIndex: number;

  constructor(private stepService: StepService) { }

  ngAfterContentInit(): void {
    this.activeIndex = this.startingIndex;
    this.goToStep(this.startingIndex);

    this.stepService.showNextStep.subscribe(
      stepIdentifier => {
        console.log(stepIdentifier);
        console.log(this.stepIdentifier);
        if (stepIdentifier === this.stepIdentifier) {
          console.log('it matches');
          this.goToNextStep();
        }
      }
    );

    this.stepService.showPreviousStep.subscribe(
      stepIdentifier => stepIdentifier === this.stepIdentifier ? this.goToPreviousStep() : ''
    );

    this.stepService.showStep.subscribe(
      stepInfo => stepInfo.stepIdentifier === this.stepIdentifier ? this.goToStep(stepInfo.stepIndex) : ''
    );
  }

  setIndexOffset(indexOffset: number): void {
    this.indexOffset = indexOffset;
  }

  private postNewStepAnimationHandler(): void {
    this.stepComponents
      .filter((step, index) => this.indexContainedInBoundary(index, this.nextIndex, this.activeIndex))
      .forEach(step => { if (step !== this.stepComponents.toArray()[this.nextIndex]) { step.hide(); }});

    this.activeIndex = this.nextIndex;
  }

  public goToStep(stepIndex: number): void {
    console.log('going to next step');
    this.nextIndex = stepIndex;
    this.stepComponents
      .filter((step, index) => this.indexContainedInBoundary(index, this.nextIndex, this.activeIndex))
      .forEach(step => step.show());

    this.setIndexOffset(-100 * this.nextIndex);
  }

  private indexContainedInBoundary(index, boundary1, boundary2): boolean { // inclusive
    return ((index >= boundary1) && (index <= boundary2)) || ((index >= boundary2) && (index <= boundary1))
  }

  public goToNextStep(): void {
    console.log(this.indexIsValid(this.activeIndex + 1));
    if (this.indexIsValid(this.activeIndex + 1)) {
      this.goToStep(this.activeIndex + 1);
    }
  }

  public goToPreviousStep(): void {
    if (this.indexIsValid(this.activeIndex - 1)) {
      this.goToStep(this.activeIndex - 1);
    }
  }

  private indexIsValid(index: number) {
    return index >= 0 && index < this.stepComponents.length;
  }

}
