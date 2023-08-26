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

  ship: Ship;

  difficulty: Difficulty;

  saveVersion: number;
  gameVersion: string;
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.saveVersion = 1;
    this.gameVersion = "0.1.0";
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
}
