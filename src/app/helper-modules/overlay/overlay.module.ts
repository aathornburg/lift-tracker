import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownModule } from './dropdown/dropdown.module';
import { OverlayService } from './overlay.service';

@NgModule({
  imports: [
    CommonModule,
    DropdownModule.forRoot()
  ],
  declarations: [],
  exports: [
    DropdownModule
  ]
})
export class OverlayModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: OverlayModule,
      providers: [OverlayService]
    };
  }
}
