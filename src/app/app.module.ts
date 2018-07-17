import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavigationBarComponent } from './components/navigation/navigation-bar/navigation-bar.component';
import { NavigationItemComponent } from './components/navigation/navigation-item/navigation-item.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    NavigationItemComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
