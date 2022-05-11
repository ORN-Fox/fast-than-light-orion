import { Component, OnInit } from '@angular/core';

import { Game } from '../../core/models/game/game.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  game: Game | null;

  constructor() { }

  ngOnInit(): void {
  }

  continueGame() {
    // TODO
  }

  newGame() {
    // TODO
    this.game = new Game();
    // TODO navigate to shed view
  }

  quitGame() {
    // TODO
  }

}
