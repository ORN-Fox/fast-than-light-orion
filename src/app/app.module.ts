import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ShedComponent } from './views/shed/shed.component';
import { MenuComponent } from './views/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    ShedComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
