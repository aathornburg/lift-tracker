import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { DropdownService } from './services/dropdown.service';
import { OpenDropdownDirective } from './directives/open-dropdown/open-dropdown.directive';
import { DropdownComponent } from './components/dropdown/dropdown.component';

@NgModule({
  declarations: [
    DropdownComponent,
    OpenDropdownDirective
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule
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
