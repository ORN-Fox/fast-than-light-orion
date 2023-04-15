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
}
