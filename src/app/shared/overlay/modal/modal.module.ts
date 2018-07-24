import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from './modal.service';
import { ModalComponent } from './modal.component';
import { OpenModalDirective } from './open-modal.directive';

@NgModule({
  declarations: [
    ModalComponent,
    OpenModalDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalComponent,
    OpenModalDirective
  ]
})
export class ModalModule {
  static forParent(): ModuleWithProviders {
    return {
      ngModule: ModalModule,
      providers: [ModalService]
    };
  }
}
