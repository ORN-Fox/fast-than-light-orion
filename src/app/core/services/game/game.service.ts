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

  private game: Game;

  constructor() {
    this.difficulties = this.getDifficulties();
  }

  shouldExistGameInProgress(): boolean {
    return StorageService.getLocalStorageItem(this.SETTINGS_LOCAL_STORAGE_KEY) != null;
  }

  getGame(): Game {
    if (!this.game) {
      this.game = this.reloadGameFromSave();
    }

    return this.game;
  }

  newGame(): Game {
    StorageService.removeLocalStorageItem(this.SETTINGS_LOCAL_STORAGE_KEY);
    this.game = new Game();
    return this.game;
  }

  storeGame(game: Game) {
    this.game = game;
    this.game.updatedAt = new Date();
    StorageService.setLocalStorageItem(this.SETTINGS_LOCAL_STORAGE_KEY, game.serializeForSave());
  }

  getDifficulties(): Difficulty[] {
    return [
      new Difficulty('easy', DifficultyEnum.Easy, 1),
      new Difficulty('normal', DifficultyEnum.Normal, 2),
      new Difficulty('hard', DifficultyEnum.Hard, 3)
    ];
  }

  private reloadGameFromSave(): Game {
    let storedSave = StorageService.getLocalStorageItem(this.SETTINGS_LOCAL_STORAGE_KEY);
    let game = new Game();

    if (storedSave) {
      game.deserilizeFromSave(storedSave);
      console.debug('Game', game);
    } else {
      console.error('Stored save not found', storedSave);
    }

    return game;
  }

}
