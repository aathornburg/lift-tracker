import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { LiftsComponent } from './components/lifts/lifts.component';
import { AddLiftComponent } from './components/add-lift/add-lift.component';
import { LiftComponent } from './components/lift/lift.component';

import { LiftsService } from './services/lifts.service';
import { AddLiftModalComponent } from './components/add-lift-modal/add-lift-modal.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    LiftsComponent,
    AddLiftComponent,
    LiftComponent,
    AddLiftModalComponent
  ],
  exports: [
    LiftsComponent,
    AddLiftComponent,
    LiftComponent
  ]
})
export class LiftsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LiftsModule,
      providers: [LiftsService]
    };
  }
}
