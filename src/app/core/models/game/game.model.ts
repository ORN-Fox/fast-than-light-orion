import { Difficulty } from '../difficulty/difficulty.model';
import { Ship } from '../ships/ship.model';

export class Game {

  ship: Ship;

  difficulty: Difficulty;
  advancedEditionEnabled: boolean;

  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.advancedEditionEnabled = true;

    this.createdAt = new Date();
  }
}
