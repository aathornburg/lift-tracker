import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OverlayModule } from './overlay/overlay.module';
import { StepModule } from './step/step.module';
import { FocusModule } from './focus/focus.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    OverlayModule.forParent(),
    StepModule.forParent(),
    FocusModule.forParent()
  ],
  exports: [
    ReactiveFormsModule,
    OverlayModule,
    StepModule,
    RouterModule
  ]
})
export class SharedModule { }
