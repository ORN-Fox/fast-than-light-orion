import { Injectable } from '@angular/core';

import { Logger } from '../logger/logger.service';
import { Settings } from '../../models/settings/settings.model';
const log = new Logger('SettingsService');

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  SETTINGS_LOCAL_STORAGE_KEY: string = 'ftl-orion-settings';
  settings: Settings;

  constructor() {}

  getSettings(): Settings
  {
    let storedSettings = localStorage.getItem(this.SETTINGS_LOCAL_STORAGE_KEY);

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
    localStorage.setItem(this.SETTINGS_LOCAL_STORAGE_KEY, JSON.stringify(settings, null, 2));
    log.debug('Settings set to :', settings);
  }
}
