// import * as PIXI from 'pixi.js' // Many errors on typescript
declare var PIXI: any;

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GameService } from '../../core/services/game/game.service';
import { SettingsService } from '../../core/services/settings/settings.service';
import { ShipRenderService } from '../../core/services/shipRender/ship-render.service';
import { ShipsService } from '../../core/services/ships/ships.service';
import { TexturesManagerService } from '../../core/services/texturesManager/textures-manager.service';

import { Difficulty } from '../../core/models/difficulty/difficulty.model';
import { Game } from '../../core/models/game/game.model';
import { Settings } from '../../core/models/settings/settings.model';
import { Ship, ShipList } from '../../core/models/ships/index';

@Component({
  selector: 'app-shed',
  templateUrl: './shed.component.html',
  styleUrls: ['./shed.component.scss']
})
export class ShedComponent implements OnInit {

  app: any;
  canvasHeight: number = 720;
  canvasWidth: number = 1280;

  difficulties: Difficulty[];

  game: Game;
  settings: Settings;

  shipsList: ShipList[];
  shipListIndex: number = 0;
  shipListLayoutIndex: number = 0;

  shedContainer: any;
  shipGUIContainer: any;
  shipContainer: any;
  shipFloorContainer: any;

  selectedShip: Ship;

  renameShipEnabled: boolean = false;
  displayRooms: boolean = true;
  shipHaveNoDroneControlSystem: boolean = false;

  constructor(
    private router: Router,
    private gameService: GameService,
    private settingsService: SettingsService,
    private shipRenderService: ShipRenderService,
    private shipsService: ShipsService,
    private texturesManagerService: TexturesManagerService)
  {
    this.game = this.gameService.newGame();
    this.settings = this.settingsService.getSettings();

    this.difficulties = this.gameService.difficulties;
    this.game.difficulty = this.difficulties[0];

    this.shipsList = this.shipsService.getShips();
  }

  ngOnInit(): void {
    this.initShepPage();

    this.loadSelectedShip(this.shipsList[this.shipListIndex].layouts[this.shipListLayoutIndex]);

    let loadingComplete = () => {
      this.loadShepAnimations();

      this.shipHaveNoDroneControlSystem = this.selectedShip.drones.length == 0;

      this.shipRenderService.startShipRender(this.shipContainer, this.shipFloorContainer, this.selectedShip, true, this.shipGUIContainer);
    }

    this.texturesManagerService.loadRacesSpritesheets(loadingComplete);

    const modals = document.querySelectorAll("[data-modal]");

    modals.forEach(function (trigger: any) {
      trigger.addEventListener("click", function (event: any) {
        event.preventDefault();
        const modal = document.getElementById(trigger.dataset.modal) as HTMLElement;
        const exits = modal.querySelectorAll(".modal-exit");
        exits.forEach(function (exit) {
          exit.addEventListener("click", function (event) {
            event.preventDefault();
            modal.classList.remove("open");
          });
        });
      });
    });
  }

  initShepPage()
  {
    this.app = new PIXI.Application({ backgroundAlpha: 0, height: this.canvasHeight, width: this.canvasWidth });
    document.querySelector('#canvsPixi')!.appendChild(this.app.view);

    const shedBody = document.querySelector('.shed') as HTMLElement;
    shedBody.style.height = `${this.canvasHeight}px`;
    shedBody.style.width = `${this.canvasWidth}px`;

    if (this.settings.fullScreenMode)
    {
      (shedBody.style as any).zoom = 1.5;
    }

    const shedGUIContainer = document.querySelector('.shed-gui-container') as HTMLElement;
    shedGUIContainer.style.height = `${this.canvasHeight}px`;
    shedGUIContainer.style.width = `${this.canvasWidth}px`;

    this.shedContainer = new PIXI.Container();
    this.app.stage.addChild(this.shedContainer);

    const shipsListGUIContainer = document.querySelector('.modal') as HTMLElement;
    shipsListGUIContainer.style.height = `${this.canvasHeight}px`;
    shipsListGUIContainer.style.width = `${this.canvasWidth}px`;
  }

  loadSelectedShip(ship: Ship)
  {
    this.selectedShip = ship;

    this.shipGUIContainer = new PIXI.Container();

    this.shipContainer = new PIXI.Container();
    this.shipContainer.x = 300;
    this.shipContainer.height = 400;
    this.shipContainer.width = 660;

    this.shipFloorContainer = new PIXI.Container();
    this.shipFloorContainer.x = 300;
    this.shipFloorContainer.y = 0;
    this.shipFloorContainer.height = 400;
    this.shipFloorContainer.width = 660;

    this.app.stage.addChild(this.shipGUIContainer, this.shipContainer, this.shipFloorContainer);

    const shipHull = PIXI.Sprite.from(this.selectedShip.srcHullSprite);
    shipHull.x = this.selectedShip.hullSpriteX - 300; // - 300px is temporary use for positioning floor ship sprite on shed view
    shipHull.y = this.selectedShip.hullSpriteY;

    this.shipContainer.addChild(shipHull);

    let selectedShipFloor = PIXI.Sprite.from(this.selectedShip.srcInteriorSprite);
    selectedShipFloor.x = this.selectedShip.interiorSpriteX - 300; // - 300px is temporary use for positioning floor ship sprite on shed view
    selectedShipFloor.y = this.selectedShip.interiorSpriteY;

    this.shipFloorContainer.addChild(selectedShipFloor);
  }

  loadShepAnimations()
  {
    const humanMaleSheet = this.texturesManagerService.getRaceSheetForRace('human-male');
    const humanFemaleSheet = this.texturesManagerService.getRaceSheetForRace('human-female');
    const humanAnimationSpeed = .1;

    let animatedShipEngineerSprite = new PIXI.AnimatedSprite(humanMaleSheet.animations["useComputer_Top"]);
    animatedShipEngineerSprite.x = 100;
    animatedShipEngineerSprite.y = 109;

    let animatedShipEngineerReparingDroneSprite = new PIXI.AnimatedSprite(humanMaleSheet.animations["repair"]);
    animatedShipEngineerReparingDroneSprite.x = 1120;
    animatedShipEngineerReparingDroneSprite.y = 114;

    let animatedShipEngineerReparingShipSprite = new PIXI.AnimatedSprite(humanFemaleSheet.animations["repair"]);
    animatedShipEngineerReparingShipSprite.x = 1100;
    animatedShipEngineerReparingShipSprite.y = 362;

    if (this.settings.dynamicBackground)
    {
      animatedShipEngineerSprite.animationSpeed = humanAnimationSpeed;
      animatedShipEngineerSprite.play();

      animatedShipEngineerReparingDroneSprite.animationSpeed = humanAnimationSpeed;
      animatedShipEngineerReparingDroneSprite.play();

      animatedShipEngineerReparingShipSprite.animationSpeed = humanAnimationSpeed;
      animatedShipEngineerReparingShipSprite.play();
    }

    this.shedContainer.addChild(animatedShipEngineerSprite, animatedShipEngineerReparingDroneSprite, animatedShipEngineerReparingShipSprite);
  }

  previousShip()
  {
    this.shipListIndex--;

    if (this.shipListIndex < 0)
    {
      this.shipListIndex = this.shipsList.length - 1;
    }

    this.selectShip(this.shipsList[this.shipListIndex].layouts[this.shipListLayoutIndex]);
  }

  openShipsList()
  {
    let modalShipList = document.querySelector('#modal-ships-list') as HTMLElement;
    modalShipList.classList.add('open');
  }

  nextShip()
  {
    this.shipListIndex++;

    if (this.shipListIndex > this.shipsList.length - 1)
    {
      this.shipListIndex = 0;
    }

    this.selectShip(this.shipsList[this.shipListIndex].layouts[this.shipListLayoutIndex]);
  }

  selectShipLayout(layoutIndex: number)
  {
    this.shipListLayoutIndex = layoutIndex;
  }

  selectShip(ship: Ship)
  {
    if (ship != this.selectedShip)
    {
      this.shipGUIContainer.destroy();
      this.shipContainer.destroy();
      this.shipFloorContainer.destroy();

      ship.resetName();

      this.displayRooms = true;

      this.loadSelectedShip(ship);

      this.shipHaveNoDroneControlSystem = ship.drones.length == 0;

      this.shipRenderService.startShipRender(this.shipContainer, this.shipFloorContainer, this.selectedShip, true, this.shipGUIContainer);
    }
  }

  selectShipFromShipListSelector(shipListIndex: number, ship: Ship)
  {
    if (shipListIndex)
    {
      this.shipListIndex = shipListIndex;
    }

    let modalShipList = document.querySelector('#modal-ships-list') as HTMLElement;
    modalShipList.classList.remove('open');

    this.selectShip(ship);
  }

  selectDifficulty(difficulty: Difficulty)
  {
    this.game.difficulty = difficulty;
  }

  openRenameShipInput()
  {
    this.renameShipEnabled = true;

    let renameShipInput = document.querySelector('#inputShipRename') as HTMLInputElement;
    renameShipInput.focus();
  }

  closeRenameShipInput()
  {
    this.renameShipEnabled = false;

    let renameShipInput = document.querySelector('#inputShipRename') as HTMLInputElement;
    renameShipInput.blur();
  }

  toggleShipRooms() {
    this.displayRooms = !this.displayRooms;
    this.shipFloorContainer.visible = this.displayRooms;
  }

  toggleAdvancedEditionContentActivation() {
    this.game.advancedEditionEnabled = !this.game.advancedEditionEnabled;
  }

  startGame() {
    this.game.ship = this.selectedShip;
    this.gameService.storeGame(this.game);

    this.router.navigate(['/game']);
  }

}
