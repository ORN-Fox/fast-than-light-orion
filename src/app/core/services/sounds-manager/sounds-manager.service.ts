import { Injectable, Optional, SkipSelf } from '@angular/core';
import { sound } from '@pixi/sound';

import { PageNameEnum } from '../../enums/page-name.enum';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root',
})
export class SoundsManagerService {

  constructor(
    private settingsService: SettingsService,
    @Optional() @SkipSelf() parentModule?: SoundsManagerService
  ) {
    let settings = this.settingsService.getSettings();
    this.setMusicVolume(settings.musicVolume);

    if (parentModule) {
      throw new Error('SoundsManagerService is already loaded. Import it in the AppModule only');
    }
  }

  initPageSounds(pageEnum: number) {
    switch (pageEnum) {
      case PageNameEnum.Menu:
        this.loadMenuSounds();
        this.playSound('main-theme');
        break;

      case PageNameEnum.Shed:
        this.loadShedSounds();
        this.playSound('main-theme');
        break;
    }
  }

  // Sounds controls related

  isExistingSound(name: string): boolean {
    return sound.exists(name);
  }

  isPlayedSound(name: string): boolean {
    return sound.find(name).isPlaying;
  }

  addSound(name: string, src: string) {
    if (!this.isExistingSound(name)) {
      sound.add(name, src);
    }
  }

  playSound(name: string) {
    if (!this.isPlayedSound(name)) {
      sound.play(name);
    }
  }

  setAudioVolume(volume: number) {
    // TODO
  }

  setMusicVolume(volume: number) {
    sound.context.volume = volume;
    sound.context.paused = volume == 0;
  }

  stopSound(name: string) {
    sound.stop(name);
  }

  // Loading sounds related

  private loadMenuSounds() {
    this.addSound('main-theme', 'assets/sounds/music/bp_MUS_TitleScreen.ogg');
  }

  private loadShedSounds() {
    // TODO add shed sounds ambiance
  }

}
