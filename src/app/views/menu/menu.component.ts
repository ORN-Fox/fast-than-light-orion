import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Game } from '../../core/models/game/game.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  game: Game | null;

  constructor(
    private router: Router) { }

  ngOnInit(): void {
  }

  continueGame() {
    // TODO
  }

  newGame() {
    this.game = new Game();
    this.router.navigate(['/shed']);
  }

  quitGame() {
    // TODO
  }

}
