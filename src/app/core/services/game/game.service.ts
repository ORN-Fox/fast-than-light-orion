import { Injectable } from '@angular/core';

import { Difficulty, DifficultyEnum } from '../../models/difficulty/difficulty.model';
import { Game } from '../../models/game/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  game: Game;
  difficulties: Difficulty[];

  constructor() {
    this.difficulties = [
      new Difficulty('easy', DifficultyEnum.Easy, 1),
      new Difficulty('normal', DifficultyEnum.Normal, 2),
      new Difficulty('hard', DifficultyEnum.Hard, 3)
    ]
  }

  shouldExistGameInProgress(): boolean
  {
    return this.game != null;
  }

  newGame()
  {
    this.game = new Game();
  }
}
