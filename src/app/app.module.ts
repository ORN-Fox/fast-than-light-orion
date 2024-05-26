import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { TranslateModule } from '@ngx-translate/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Root services
import { SettingsService } from './core/services/settings/settings.service';
import { SoundsManagerService } from './core/services/sounds-manager/sounds-manager.service';

// Commons
import { ModalComponent } from './views/commons/modal/modal.component';
import { SettingsModalComponent } from './views/commons/settings-modal/settings-modal.component';

// Pages
import { ShedComponent } from './views/shed/shed.component';
import { MenuComponent } from './views/menu/menu.component';
import { GameComponent } from './views/game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    SettingsModalComponent,
    ShedComponent,
    MenuComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TranslateModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    SettingsService,
    SoundsManagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
