import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavigationBarComponent } from './components/navigation/navigation-bar/navigation-bar.component';
import { NavigationItemComponent } from './components/navigation/navigation-item/navigation-item.component';

import { RoutingModule } from './app.routing';
import { LiftsComponent } from './components/pages/lifts/lifts.component';
import { AddLiftComponent } from './components/lift/add-lift/add-lift.component';
import { LiftComponent } from './components/lift/lift/lift.component';

import { LiftsService } from './services/lifts.service';

import { OverlayModule } from './helper-modules/overlay/overlay.module';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    NavigationItemComponent,
    LiftsComponent,
    AddLiftComponent,
    LiftComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule,
    OverlayModule.forRoot()
  ],
  providers: [
    LiftsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
