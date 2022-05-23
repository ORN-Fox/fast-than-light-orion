import { Component, OnInit } from '@angular/core';

import { GameService } from '../../core/services/game/game.service';

import { Game } from '../../core/models/game/game.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  game: Game;

  constructor(
    private gameService: GameService)
  {
    this.game = this.gameService.game;
    console.log('Start game, include in future version', this.game);
  }

  ngOnInit(): void {
  }

}
