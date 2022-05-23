import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GameService } from '../../core/services/game/game.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  gameInProgress: boolean;

  constructor(
    private router: Router,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.gameInProgress = this.gameService.shouldExistGameInProgress();
  }

  continueGame() {
    // TODO
  }

  newGame() {
    this.router.navigate(['/shed']);
  }

  openSettings() {
    // TODO
  }

}
