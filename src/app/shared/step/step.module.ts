import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StepComponent } from './components/step/step.component';
import { StepGroupComponent } from './components/step-group/step-group.component';

import { StepService } from './services/step.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    StepComponent,
    StepGroupComponent
  ],
  exports: [
    StepComponent,
    StepGroupComponent
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
