import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TooltipOutletComponent } from './components/tooltip-outlet/tooltip-outlet.component';
import { TooltipAnchorDirective } from './directives/tooltip-anchor/tooltip-anchor.directive';
import { TooltipService } from './services/tooltip.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TooltipOutletComponent,
    TooltipAnchorDirective
  ],
  exports: [
    TooltipOutletComponent,
    TooltipAnchorDirective
  ]
})
export class TooltipModule {
  static forParent(): ModuleWithProviders {
    return {
      ngModule: TooltipModule,
      providers: [TooltipService]
    };
  }
}
