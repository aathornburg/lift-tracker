import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from './core.routing';

import { NavigationBarComponent } from './navigation/navigation-bar/navigation-bar.component';
import { NavigationItemComponent } from './navigation/navigation-item/navigation-item.component';

import { LiftsModule } from '../pages/lifts/lifts.module';

@NgModule({
  imports: [
    CommonModule,
    RoutingModule,
    LiftsModule.forRoot()
  ],
  declarations: [
    NavigationBarComponent,
    NavigationItemComponent
  ],
  exports: [
    NavigationBarComponent,
    NavigationItemComponent
  ]
})
export class CoreModule { }
