import { Injectable, Optional, SkipSelf } from '@angular/core';
import { sound } from '@pixi/sound';

import { ArrayService } from '../../utils/array.service';

import { PageNameEnum } from '../../enums/page-name.enum';

@Injectable({
  providedIn: 'root',
})
export class SoundsManagerService {

  playedSound: string[] = [];

  constructor(@Optional() @SkipSelf() parentModule?: SoundsManagerService) {
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
    }
  }

  // Sounds controls related

  isPlayedSound(soundName: string): boolean {
    return ArrayService.getItemIndex(this.playedSound, soundName) == ArrayService.NOT_FOUND_ITEM_INDEX;
  }

  playSound(soundName: string) {
    sound.play(soundName);
    if (!this.isPlayedSound(soundName)) {
      this.playedSound.push(soundName);
    }
  }

  stopSound(soundName: string) {
    sound.stop(soundName);
    this.playedSound = ArrayService.removeItem(this.playedSound, soundName);
  }

  // Loading sounds related

  private loadMenuSounds() {
    sound.add('main-theme', 'assets/sounds/music/bp_MUS_TitleScreen.ogg');
  }

}
