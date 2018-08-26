import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FocusService } from './services/focus.service';

@NgModule({
  imports: [
    CommonModule
  ]
})
export class FocusModule {
  static forParent(): ModuleWithProviders {
    return {
      ngModule: FocusModule,
      providers: [ FocusService ]
    }
  }
}
