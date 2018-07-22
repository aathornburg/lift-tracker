import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownModule } from './dropdown/dropdown.module';
import { ModalModule } from './modal/modal.module';
import { OverlayService } from './overlay.service';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  imports: [
    CommonModule,
    DropdownModule.forRoot(),
    ModalModule.forRoot()
  ],
  exports: [
    DropdownModule,
    ModalModule
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
