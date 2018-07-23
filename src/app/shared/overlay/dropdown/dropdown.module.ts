import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownService } from './dropdown.service';
import { DropdownComponent } from './dropdown.component';
import { OpenDropdownDirective } from './open-dropdown.directive';

@NgModule({
  declarations: [
    DropdownComponent,
    OpenDropdownDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DropdownComponent,
    OpenDropdownDirective
  ]
})
export class DropdownModule {
  static forParent(): ModuleWithProviders {
    return {
      ngModule: DropdownModule,
      providers: [DropdownService]
    };
  }
}
