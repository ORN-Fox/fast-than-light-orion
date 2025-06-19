import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { GameService } from '../../core/services/game/game.service';
import { SettingsService } from '../../core/services/settings/settings.service';
import { SoundsManagerService } from '../../core/services/sounds-manager/sounds-manager.service';

import { PageNameEnum } from '../../core/enums/page-name.enum';

import { Settings } from '../../core/models/settings/settings.model';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    standalone: false
})
export class MenuComponent {

  settings: Settings;

  gameInProgress: boolean;

  showSettingsModal: boolean = false;

  constructor(
    private router: Router,
    private gameService: GameService,
    private settingsService: SettingsService,
    private soundManagerService: SoundsManagerService
  ) {
    this.settings = this.settingsService.getSettings();

    this.soundManagerService.initPageSounds(PageNameEnum.Menu);

    this.gameInProgress = this.gameService.shouldExistGameInProgress();
  }

  continueGame() {
    this.router.navigate(['/game']);
  }

  newGame() {
    this.gameService.newGame();
    this.router.navigate(['/shed']);
  }

  toggleSettingsModal = () => {
    this.showSettingsModal = !this.showSettingsModal;
  }

}
