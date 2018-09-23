import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutsComponent } from './components/workouts/workouts.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    WorkoutsComponent
  ],
  exports: [
    WorkoutsComponent
  ]
})
export class WorkoutsModule { }
