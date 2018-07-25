import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from './services/modal.service';
import { ModalComponent } from './components/modal/modal.component';
import { OpenModalDirective } from './directives/open-modal/open-modal.directive';

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
