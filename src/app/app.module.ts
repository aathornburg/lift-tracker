import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { RoutingModule } from './app.routing';
import { OverlayModule } from './helper-modules/overlay/overlay.module';

import { AppComponent } from './app.component';
import { LiftsComponent } from './components/pages/lifts/lifts.component';
import { AddLiftComponent } from './components/lift/add-lift/add-lift.component';
import { LiftComponent } from './components/lift/lift/lift.component';
import { AddLiftModalComponent } from './components/lift/add-lift-modal/add-lift-modal.component';
import { NavigationBarComponent } from './components/navigation/navigation-bar/navigation-bar.component';
import { NavigationItemComponent } from './components/navigation/navigation-item/navigation-item.component';

import { LiftsService } from './services/lifts.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    NavigationItemComponent,
    LiftsComponent,
    AddLiftComponent,
    LiftComponent,
    AddLiftModalComponent
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
