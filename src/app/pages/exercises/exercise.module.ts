import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { ExerciseService } from './services/exercise.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class ExerciseModule {
  static forParent(): ModuleWithProviders {
    return {
      ngModule: ExerciseModule,
      providers: [ ExerciseService ]
    }
  }
}
