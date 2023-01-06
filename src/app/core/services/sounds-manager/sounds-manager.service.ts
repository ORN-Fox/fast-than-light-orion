import { Injectable } from '@angular/core';
import { sound } from '@pixi/sound';

import { PageNameEnum } from '../../enums/page-name.enum';

@Injectable({
  providedIn: 'root'
})
export class SoundsManagerService {

  constructor() { }

  initPageSounds(pageEnum: number) {
    switch (pageEnum) {
      case PageNameEnum.Menu:
        this.loadMenuSounds();
        this.playSound('main-theme');
        break;
    }
  }

  playSound(soundName: string) {
    sound.play(soundName);
  }

  stopSound(soundName: string) {
    sound.stop(soundName);
  }

  private loadMenuSounds() {
    sound.add('main-theme', 'assets/sounds/music/bp_MUS_TitleScreen.ogg');
  }

}
