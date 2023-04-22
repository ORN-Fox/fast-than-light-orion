import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { TranslateModule } from '@ngx-translate/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Commons
import { ModalComponent } from './views/commons/modal/modal.component';

// Pages
import { ShedComponent } from './views/shed/shed.component';
import { MenuComponent } from './views/menu/menu.component';
import { GameComponent } from './views/game/game.component';
import { SettingsModalComponent } from './views/commons/settings-modal/settings-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    ShedComponent,
    MenuComponent,
    GameComponent,
    SettingsModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TranslateModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
