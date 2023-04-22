import { Difficulty } from '../difficulty/difficulty.model';
import { Ship } from '../ships/ship.model';

export class Game {

  ship: Ship;

  difficulty: Difficulty;

  saveVersion: number;
  gameVersion: string;
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.saveVersion = 1;
    this.gameVersion = "0.0.1";
    this.createdAt = new Date();
  }

  serializeForSave() {
    let serializedGame = {
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
