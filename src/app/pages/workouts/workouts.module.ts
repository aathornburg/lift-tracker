import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { WorkoutsComponent } from './components/workouts/workouts.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    WorkoutsComponent
  ],
  exports: [
    WorkoutsComponent
  ]
})
export class WorkoutsModule { }
