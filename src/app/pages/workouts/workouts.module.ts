import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { WorkoutsComponent } from './components/workouts/workouts.component';
import { WorkoutDayComponent } from './components/workout-day/workout-day.component';
import { ExerciseInputDropdownComponent } from './components/exercise-input-dropdown/exercise-input-dropdown.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    WorkoutsComponent,
    WorkoutDayComponent,
    ExerciseInputDropdownComponent
  ],
  exports: [
    WorkoutsComponent
  ]
})
export class WorkoutsModule { }
