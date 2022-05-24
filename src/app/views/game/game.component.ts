declare var PIXI: any;

import { Component, OnInit } from '@angular/core';

import { GameService } from '../../core/services/game/game.service';
import { ShipRenderService } from '../../core/services/shipRender/ship-render.service';

import { Game } from '../../core/models/game/game.model';
import { Ship } from '../../core/models/ships/index';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  app: any;
  canvasHeight: number = 720;
  canvasWidth: number = 1280;

  game: Game;

  gameContainer: any;

  shipContainer: any;
  shipFloorContainer: any;

  constructor(
    private gameService: GameService,
    private shipRenderService: ShipRenderService)
  {
    this.game = this.gameService.game;
    console.log('Start game, include in future version', this.game);
  }

  ngOnInit(): void {
    this.app = new PIXI.Application({ backgroundAlpha: 0, height: this.canvasHeight, width: this.canvasWidth });
    document.querySelector('#canvsPixi')!.appendChild(this.app.view);

    const gameBody = document.querySelector('.game') as HTMLElement;
    gameBody.style.height = `${this.canvasHeight}px`;
    gameBody.style.width = `${this.canvasWidth}px`;

    this.gameContainer = new PIXI.Container();
    this.app.stage.addChild(this.gameContainer);

    this.loadSelectedShip(this.game.ship);
    this.shipRenderService.startShipRender(this.shipContainer, this.shipFloorContainer, this.game.ship);
  }

  loadSelectedShip(ship: Ship)
  {
    this.shipContainer = new PIXI.Container();
    this.shipContainer.x = 300;
    this.shipContainer.height = 400;
    this.shipContainer.width = 660;

    this.shipFloorContainer = new PIXI.Container();
    this.shipFloorContainer.x = 300;
    this.shipFloorContainer.y = 0;
    this.shipFloorContainer.height = 400;
    this.shipFloorContainer.width = 660;

    this.app.stage.addChild(this.shipContainer, this.shipFloorContainer);

    const shipHull = PIXI.Sprite.from(ship.srcHullSprite);
    shipHull.x = ship.hullSpriteX - 300; // - 300px is temporary use for positioning floor ship sprite on shed view
    shipHull.y = ship.hullSpriteY;

    this.shipContainer.addChild(shipHull);

    let selectedShipFloor = PIXI.Sprite.from(ship.srcInteriorSprite);
    selectedShipFloor.x = ship.interiorSpriteX - 300; // - 300px is temporary use for positioning floor ship sprite on shed view
    selectedShipFloor.y = ship.interiorSpriteY;

    this.shipFloorContainer.addChild(selectedShipFloor);
  }

}
