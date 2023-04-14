import { Injectable } from '@angular/core';

import { StorageService } from '../../utils/storage.service';

import { Difficulty, DifficultyEnum } from '../../models/difficulty/difficulty.model';
import { Game } from '../../models/game/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  SETTINGS_LOCAL_STORAGE_KEY: string = 'ftl-orion-save';
  difficulties: Difficulty[];
  game: Game;

  constructor() {
    this.difficulties = [
      new Difficulty('easy', DifficultyEnum.Easy, 1),
      new Difficulty('normal', DifficultyEnum.Normal, 2),
      new Difficulty('hard', DifficultyEnum.Hard, 3)
    ];
  }

  shouldExistGameInProgress(): boolean
  {
    let storedSave = StorageService.getLocalStorageItem(this.SETTINGS_LOCAL_STORAGE_KEY);

    if (storedSave)
    {
      this.game = JSON.parse(storedSave);
    }
    
    return this.game != null;
  }

  newGame(): Game
  {
    StorageService.removeLocalStorageItem(this.SETTINGS_LOCAL_STORAGE_KEY);
    return new Game();
  }

  storeGame(game: Game)
  {
    this.game = game;
    StorageService.setLocalStorageItem(this.SETTINGS_LOCAL_STORAGE_KEY, game);
  }
}
