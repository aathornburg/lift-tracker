import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OverlayModule } from './overlay/overlay.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    OverlayModule.forParent()
  ],
  exports: [
    OverlayModule,
    RouterModule
  ]
})
export class SharedModule { }
