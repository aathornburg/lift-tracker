import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownService } from './services/dropdown.service';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { OpenDropdownDirective } from './directives/open-dropdown/open-dropdown.directive';

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
