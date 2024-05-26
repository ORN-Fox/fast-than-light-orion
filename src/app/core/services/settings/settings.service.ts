import { Injectable, Optional, SkipSelf } from '@angular/core';

import { Logger } from '../logger/logger.service';
import { StorageService } from '../../utils/storage.service';

import { Settings } from '../../models/settings/settings.model';

const log = new Logger('SettingsService');

@Injectable()
export class SettingsService {

  private SETTINGS_LOCAL_STORAGE_KEY: string = 'ftl-orion-settings';
  private settings: Settings;

  constructor(@Optional() @SkipSelf() sharedService?: SettingsService) {
    if (sharedService) {
      throw new Error('SoundsManagerService is already loaded');
    }
    this.getSettings();
    console.info('SettingsService created');
  }

  getSettings(): Settings
  {
    let storedSettings = StorageService.getLocalStorageItem(this.SETTINGS_LOCAL_STORAGE_KEY);

    if (storedSettings)
    {
      this.settings = JSON.parse(storedSettings);
    }
    else
    {
      // Init default settings
      this.setSettings(new Settings());
    }

    log.debug('Get settings :', this.settings);
    return this.settings;
  }

  setSettings(settings: Settings)
  {
    this.settings = settings;
    log.debug('Settings set to :', settings);
    StorageService.setLocalStorageItem(this.SETTINGS_LOCAL_STORAGE_KEY, settings);
  }
}
