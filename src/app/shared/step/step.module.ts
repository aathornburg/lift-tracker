import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StepComponent } from './components/step/step.component';
import { StepGroupComponent } from './components/step-group/step-group.component';

import { StepService } from './services/step.service';
import { NextStepDirective } from './directives/next-step.directive';
import { PreviousStepDirective } from './directives/previous-step.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    StepComponent,
    StepGroupComponent,
    NextStepDirective,
    PreviousStepDirective
  ],
  exports: [
    StepComponent,
    StepGroupComponent,
    NextStepDirective,
    PreviousStepDirective
  ]
})
export class StepModule {
  static forParent(): ModuleWithProviders {
    return {
      ngModule: StepModule,
      providers: [StepService]
    };
  }
}
