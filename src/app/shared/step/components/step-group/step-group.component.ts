import { Component, AfterContentInit, ContentChildren, QueryList } from '@angular/core';
import { StepService } from '../../services/step.service';
import { StepComponent } from '../step/step.component';

@Component({
  selector: 'lt-step-group',
  templateUrl: './step-group.component.html',
  styleUrls: ['./step-group.component.scss']
})
export class StepGroupComponent implements AfterContentInit {

  @ContentChildren(StepComponent) stepComponents: QueryList<StepComponent>;

  constructor(private stepService: StepService) { }

  ngAfterContentInit(): void {
    this.stepService.initSteps(this.stepComponents);
  }

}
