import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from './core.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NavigationBarComponent } from './navigation/navigation-bar/navigation-bar.component';
import { NavigationItemComponent } from './navigation/navigation-item/navigation-item.component';

import { LiftsModule } from '../pages/lifts/lifts.module';
import { WorkoutsModule } from '../pages/workouts/workouts.module';
import { ExerciseModule } from '../pages/exercises/exercise.module';

@NgModule({
  imports: [
    CommonModule,
    RoutingModule,
    BrowserAnimationsModule,
    LiftsModule.forRoot(),
    ExerciseModule.forParent(),
    WorkoutsModule
  ],
  declarations: [
    NavigationBarComponent,
    NavigationItemComponent
  ],
  exports: [
    NavigationBarComponent,
    NavigationItemComponent
  ]
})
export class CoreModule { }
