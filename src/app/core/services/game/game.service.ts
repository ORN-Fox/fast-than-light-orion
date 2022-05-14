import { Injectable } from '@angular/core';

import { Game } from '../../models/game/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  game: Game;

  constructor() { }

  shouldExistGameInProgress(): boolean
  {
    return this.game != null;
  }

  newGame()
  {
    this.game = new Game();
  }
}
