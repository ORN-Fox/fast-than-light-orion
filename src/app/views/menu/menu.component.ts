import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GameService } from '../../core/services/game/game.service';
import { I18nService } from '../../core/services/translations/i18n.service';
import { SoundsManagerService } from '../../core/services/sounds-manager/sounds-manager.service';
import { SettingsService } from '../../core/services/settings/settings.service';

import { PageNameEnum } from '../../core/enums/page-name.enum';

import { Settings } from '../../core/models/settings/settings.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  settings: Settings;
  languages: string[];

  menuMusic: any;

  gameInProgress: boolean;

  constructor(
    private router: Router,
    private gameService: GameService,
    private i18nService: I18nService,
    private soundsManagerServivce: SoundsManagerService,
    private settingsService: SettingsService
  ) {
    this.settings = this.settingsService.getSettings();
    this.languages = this.i18nService.supportedLanguages;
  }

  ngOnInit() {
    this.gameInProgress = this.gameService.shouldExistGameInProgress();

    this.soundsManagerServivce.initPageSounds(PageNameEnum.Menu);

    const modals = document.querySelectorAll("[data-modal]");

    modals.forEach(function (trigger: any) {
      trigger.addEventListener("click", function (event: any) {
        event.preventDefault();
        const modal = document.getElementById(trigger.dataset.modal) as HTMLElement;
        modal.classList.add("open");
        const exits = modal.querySelectorAll(".modal-exit");
        exits.forEach(function (exit) {
          exit.addEventListener("click", function (event) {
            event.preventDefault();
            modal.classList.remove("open");
          });
        });
      });
    });
  }

  continueGame() {
    this.router.navigate(['/game']);
    // this.menuMusic.stop();
  }

  newGame() {
    this.router.navigate(['/shed']);
    // this.menuMusic.stop();
  }

  // Options related

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

  changeLanguage(language: string)
  {
    this.i18nService.language = language;
    this.settings.language = language;
    this.settingsService.setSettings(this.settings);
  }

  updateAudioMusicVolume(volume: number)
  {
    this.menuMusic.volume = volume;
    this.settingsService.setSettings(this.settings);
  }

}
