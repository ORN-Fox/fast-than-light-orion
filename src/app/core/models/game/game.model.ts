import { Difficulty } from '../difficulty/difficulty.model';
import { Ship } from '../ships/ship.model';

export class Game {

  ship: Ship;

  difficulty: Difficulty;

  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.createdAt = new Date();
  }

  serializeForSave() {
    let serializedGame = {
      ship: this.ship.serializeForSave(),
      difficulty: this.difficulty.value,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt?.toISOString()
    };

    return serializedGame;
  }
}
