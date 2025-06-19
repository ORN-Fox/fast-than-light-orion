import { Component, Input } from '@angular/core';

import { I18nService } from 'src/app/core/services/translations/i18n.service';
import { SettingsService } from 'src/app/core/services/settings/settings.service';
import { SoundsManagerService } from 'src/app/core/services/sounds-manager/sounds-manager.service';

import { Settings } from 'src/app/core/models/settings/settings.model';

@Component({
    selector: 'app-settings-modal',
    templateUrl: './settings-modal.component.html',
    styleUrls: ['./settings-modal.component.scss'],
    standalone: false
})
export class SettingsModalComponent {

  @Input() showSettingsModal: boolean = false;
  @Input() toggleSettingsModal: () => void;

  settings: Settings;
  languages: string[];

  menuMusic: any;

  showLanguagesModal: boolean = false;

  constructor(
    private i18nService: I18nService,
    private settingsService: SettingsService,
    private soundManagerService: SoundsManagerService
  ) {
    this.settings = this.settingsService.getSettings();
    this.languages = this.i18nService.supportedLanguages;
  }

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
