import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavigationBarComponent } from './components/navigation/navigation-bar/navigation-bar.component';
import { NavigationItemComponent } from './components/navigation/navigation-item/navigation-item.component';

import { RoutingModule } from './app.routing';
import { LiftsComponent } from './components/pages/lifts/lifts.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    NavigationItemComponent,
    LiftsComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
