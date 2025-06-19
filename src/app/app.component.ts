import { Component, OnInit, OnDestroy } from '@angular/core';

import { Logger } from './core/services/logger/logger.service';
import { I18nService } from './core/services/translations/i18n.service';
import { SettingsService } from './core/services/settings/settings.service';
import { TexturesManagerService } from './core/services/textures-manager/textures-manager.service';

import { Settings } from './core/models/settings/settings.model';

const log = new Logger('App');

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit, OnDestroy {

  settings: Settings;
  title: string = 'fast-than-light-orion';

  constructor(
    private i18nService: I18nService,
    private settingsService: SettingsService,
    private textureManagerService: TexturesManagerService
  ) {
    this.settings = this.settingsService.getSettings();
  }

  async ngOnInit() {
    log.debug('init');

    // Setup translations
    this.i18nService.init(this.settings.language);
    await this.textureManagerService.init();
  }

  ngOnDestroy() {
    this.i18nService.destroy();
  }
}
