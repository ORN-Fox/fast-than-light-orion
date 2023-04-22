import { Component, OnDestroy, OnInit } from '@angular/core';
import { Application, Container, Sprite } from 'pixi.js';
import hotkeys from 'hotkeys-js';

import { GameService } from '../../core/services/game/game.service';
import { Logger } from '../../core/services/logger/logger.service';
import { SettingsService } from '../../core/services/settings/settings.service';
import { ShipRenderService } from '../../core/services/shipRender/ship-render.service';
import { TexturesManagerService } from 'src/app/core/services/texturesManager/textures-manager.service';

import { Game } from '../../core/models/game/game.model';
import { Settings } from '../../core/models/settings/settings.model';
import { Ship } from '../../core/models/ships/index';
import { Router } from '@angular/router';

const log = new Logger('App');

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

  app: any;
  canvasHeight: number = 720;
  canvasWidth: number = 1280;

  game: Game;
  settings: Settings;

  gameContainer: Container;

  shipContainer: Container;
  shipFloorContainer: Container;

  isPause: boolean = true;

  showGameMenuModal: boolean = false;
  showSettingsModal: boolean = false;

  constructor(
    private router: Router,
    private gameService: GameService,
    private settingsService: SettingsService,
    private shipRenderService: ShipRenderService,
    private texturesManagerService: TexturesManagerService)
  {
    this.settings = this.settingsService.getSettings();
    this.game = this.gameService.getGame();

    this.initShorcuts();

    log.info('Start game, include in future version', this.game);
  }

  ngOnInit() {
    this.app = new Application({ backgroundAlpha: 0, height: this.canvasHeight, width: this.canvasWidth });
    document.querySelector('#canvsPixi')!.appendChild(this.app.view);

    const gameBody = document.querySelector('.game') as HTMLElement;
    gameBody.style.height = `${this.canvasHeight}px`;
    gameBody.style.width = `${this.canvasWidth}px`;

    if (this.settings.fullScreenMode) {
      (gameBody.style as any).zoom = 1.5;
    }

    this.gameContainer = new Container();
    this.app.stage.addChild(this.gameContainer);

    this.loadSelectedShip(this.game.ship);
    
    this.texturesManagerService.loadRacesSpritesheets(() => {
      this.shipRenderService.startShipRender(this.shipContainer, this.shipFloorContainer, this.game.ship);
    });
  }

  ngOnDestroy() {
    this.clearShortcuts();
  }

  loadSelectedShip(ship: Ship) {
    this.shipContainer = new Container();
    this.shipContainer.x = 300;
    this.shipContainer.y = 100;
    this.shipContainer.height = 400;
    this.shipContainer.width = 660;

    this.shipFloorContainer = new Container();
    this.shipFloorContainer.x = 300;
    this.shipFloorContainer.y = 100;
    this.shipFloorContainer.height = 400;
    this.shipFloorContainer.width = 660;

    this.app.stage.addChild(this.shipContainer, this.shipFloorContainer);

    const shipHull = Sprite.from(ship.srcHullSprite);
    shipHull.x = ship.hullSpriteX - 300; // - 300px is temporary use for positioning floor ship sprite on shed view
    shipHull.y = ship.hullSpriteY;

    this.shipContainer.addChild(shipHull);

    let selectedShipFloor = Sprite.from(ship.srcInteriorSprite);
    selectedShipFloor.x = ship.interiorSpriteX - 300; // - 300px is temporary use for positioning floor ship sprite on shed view
    selectedShipFloor.y = ship.interiorSpriteY;

    this.shipFloorContainer.addChild(selectedShipFloor);
  }

  // Game menu modal related

  toggleGameMenuModal = () => {
    this.showGameMenuModal = !this.showGameMenuModal;
  }

  navigateToMenu() {
    this.gameService.storeGame(this.game);
    this.router.navigate(['/menu']);
  }

  navigateToShed() {
    // TODO display alert are your sure ?
    this.router.navigate(['/shed']);
  }

  retryGame() {
    console.log('Retry game');
    // TODO enforce reset game
    this.router.navigate(['/game']);
  }

  toggleSettingsModal = () => {
    this.showSettingsModal = !this.showSettingsModal;
  }

  toggleCommandsModal() {
    console.log('Toggle commands modal soon ...');
    // TODO
  }

  saveAndQuit() {
    this.gameService.storeGame(this.game);
    // TODO close window ??
  }

  // Shortcuts related

  private initShorcuts() {
    hotkeys('esc', () => {
      this.toggleGameMenuModal();
    });

    hotkeys('space', () => {
      this.isPause = !this.isPause;
      // TODO stop/play animation and display pause label
    });
  }

  private clearShortcuts() {
    hotkeys.unbind('esc');
    hotkeys.unbind('space');
  }

}
