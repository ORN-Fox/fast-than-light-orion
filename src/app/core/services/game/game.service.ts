import { Injectable } from '@angular/core';

import { AtlasesService } from '../atlases/atlases.service';
import { ShipsService } from '../ships/ships.service';
import { StorageService } from '../../utils/storage.service';

import { Difficulty, DifficultyEnum } from '../../models/difficulty/difficulty.model';
import { Game } from '../../models/game/game.model';
import { Crew } from '../../models/crew/crew.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  SETTINGS_LOCAL_STORAGE_KEY: string = 'ftl-orion-save';
  difficulties: Difficulty[];

  private game: Game;

  constructor(private shipService: ShipsService) {
    this.difficulties = [
      new Difficulty('easy', DifficultyEnum.Easy, 1),
      new Difficulty('normal', DifficultyEnum.Normal, 2),
      new Difficulty('hard', DifficultyEnum.Hard, 3)
    ];
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

  private reloadGameFromSave(): Game {
    let storedSave: any = StorageService.getLocalStorageItem(this.SETTINGS_LOCAL_STORAGE_KEY);
    let game: Game = new Game();

    if (storedSave) {
      storedSave = JSON.parse(storedSave);
      console.log('storedSave', storedSave);
      
      game.createdAt = new Date(storedSave.createdAt);
      game.updatedAt = new Date(storedSave.updatedAt);
      game.difficulty = this.difficulties[storedSave.difficulty];

      let ship = this.shipService.getShip(storedSave.ship.type, storedSave.ship.layout);
      if (ship) {
        ship.name = storedSave.ship.name;

        let recomputeCrews: Crew[] = [];
        storedSave.ship.crews.forEach((storedCrew: any) => {
          let crew = new Crew(storedCrew.name, AtlasesService.getRace(storedCrew.raceType), storedCrew.gender);
          crew.id = storedCrew.id;
          recomputeCrews.push(crew);
        });
        ship.crews = recomputeCrews;

        game.ship = ship;
      }

      console.log('game', game);
    }
      
    return game;
  }
  
}
