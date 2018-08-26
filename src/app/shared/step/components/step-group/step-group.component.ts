import { Component, AfterContentInit, ContentChildren, QueryList } from '@angular/core';
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

  private indexOffset: number;

  @ContentChildren(StepComponent) stepComponents: QueryList<StepComponent>;

  constructor(private stepService: StepService) { }

  ngAfterContentInit(): void {
    this.stepService.initSteps(this);
  }

  nextStep(): void {
    this.stepService.goToNextStep();
  }

  setIndexOffset(indexOffset: number): void {
    this.indexOffset = indexOffset;
  }

  postAnimationHandler(): void {
    this.stepService.goToNextStepPostAnimation();
  }

}
