import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OverlayModule } from './overlay/overlay.module';
import { StepModule } from './step/step.module';
import { FocusModule } from './focus/focus.module';
import { CheckboxModule } from './checkbox/checkbox.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    OverlayModule.forParent(),
    StepModule.forParent(),
    FocusModule.forParent(),
    CheckboxModule
  ],
  exports: [
    ReactiveFormsModule,
    OverlayModule,
    StepModule,
    RouterModule,
    CheckboxModule
  ]
})
export class SharedModule { }
