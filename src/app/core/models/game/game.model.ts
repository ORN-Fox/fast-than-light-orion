import { TranslateService } from '@ngx-translate/core';

import { CrewsService } from '../../services/crews/crews.service';
import { GameService } from '../../services/game/game.service';
import { ShipsService } from '../../services/ships/ships.service';

import { Difficulty } from '../difficulty/difficulty.model';
import { ISerializedShip, Ship } from '../ships/ship.model';

export interface ISerializedGame {
  ship: ISerializedShip;
  difficulty: number;
  saveVersion: number;
  gameVersion: string;
  createdAt: string;
  updatedAt: string;
}

export class Game {

  difficulty: Difficulty;
  ship: Ship;

  saveVersion: number;
  gameVersion: string;
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.saveVersion = 1;
    this.gameVersion = "0.2.0";
    this.createdAt = new Date();
  }

  serializeForSave(): ISerializedGame {
    let serializedGame: ISerializedGame = {
      ship: this.ship.serializeForSave(),
      difficulty: this.difficulty.value,
      saveVersion: this.saveVersion,
      gameVersion: this.gameVersion,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt?.toISOString()
    };

    return serializedGame;
  }

  deserilizeFromSave(serializedSave: string) {
    let parsedSerializedGame: ISerializedGame = JSON.parse(serializedSave);
    console.debug('parsedSerializedGame', parsedSerializedGame);

    let shipService = new ShipsService(new CrewsService(TranslateService.prototype));
    let ship = shipService.getShip(parsedSerializedGame.ship.type, parsedSerializedGame.ship.layout);
    if (ship) {
      ship.deserilizeFromSave(parsedSerializedGame.ship);
      this.ship = ship;
    }

    this.difficulty = GameService.prototype.getDifficulty(parsedSerializedGame.difficulty)
    this.saveVersion = parsedSerializedGame.saveVersion;
    this.gameVersion = parsedSerializedGame.gameVersion;
    this.createdAt = new Date(parsedSerializedGame.createdAt);
    this.updatedAt = new Date(parsedSerializedGame.updatedAt);
  }

}
