import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { GameService } from '../../core/services/game/game.service';
import { I18nService } from '../../core/services/translations/i18n.service';
import { SettingsService } from '../../core/services/settings/settings.service';
import { SoundsManagerService } from '../../core/services/sounds-manager/sounds-manager.service';

import { PageNameEnum } from '../../core/enums/page-name.enum';

import { Settings } from '../../core/models/settings/settings.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  settings: Settings;
  languages: string[];

  menuMusic: any;

  showSettingsModal: boolean = false;
  showLanguagesModal: boolean = false;

  gameInProgress: boolean;

  constructor(
    private router: Router,
    private gameService: GameService,
    private i18nService: I18nService,
    private settingsService: SettingsService,
    private soundManagerService: SoundsManagerService
  ) {
    this.settings = this.settingsService.getSettings();
    this.languages = this.i18nService.supportedLanguages;

    this.soundManagerService.initPageSounds(PageNameEnum.Menu);

    this.gameInProgress = this.gameService.shouldExistGameInProgress();
  }

  continueGame() {
    this.router.navigate(['/game']);
  }

  newGame() {
    this.router.navigate(['/shed']);
  }

  toggleSettingsModal = () => {
    this.showSettingsModal = !this.showSettingsModal;
  }

  // Settings modal related

  toggleFullScreen()
  {
    this.settings.fullScreenMode = !this.settings.fullScreenMode;
    this.settingsService.setSettings(this.settings);
  }

  toggleDynamicBackground()
  {
    this.settings.dynamicBackground = !this.settings.dynamicBackground;
    this.settingsService.setSettings(this.settings);
  }

  toggleLanguagesModal = () => {
    this.showLanguagesModal = !this.showLanguagesModal;
  }

  changeLanguage(language: string)
  {
    this.i18nService.language = language;
    this.settings.language = language;
    this.settingsService.setSettings(this.settings);
  }

  updateAudioVolume(volume: number)
  {
    this.settings.volume = volume;
    this.settingsService.setSettings(this.settings);
    this.soundManagerService.setAudioVolume(volume);
  }

  updateAudioMusicVolume(volume: number)
  {
    this.settings.musicVolume = volume;
    this.settingsService.setSettings(this.settings);
    this.soundManagerService.setMusicVolume(volume);
  }

}
