import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimatedSprite, Application, Container, Sprite } from 'pixi.js';

import { GameService } from '../../core/services/game/game.service';
import { SettingsService } from '../../core/services/settings/settings.service';
import { ShipRenderService } from '../../core/services/ship-render/ship-render.service';
import { ShipsService } from '../../core/services/ships/ships.service';
import { TexturesManagerService } from '../../core/services/textures-manager/textures-manager.service';

import { NumberService } from '../../core/utils/number.service';

import { Crew } from '../../core/models/crew/crew.model';
import { Difficulty } from '../../core/models/difficulty/difficulty.model';
import { Game } from '../../core/models/game/game.model';
import { Settings } from '../../core/models/settings/settings.model';
import { Ship, ShipList } from '../../core/models/ships/index';

@Component({
    selector: 'app-shed',
    templateUrl: './shed.component.html',
    styleUrls: ['./shed.component.scss'],
    standalone: false
})
export class ShedComponent implements OnInit {

  app: any;
  canvasHeight: number = 720;
  canvasWidth: number = 1280;

  difficulties: Difficulty[];

  game: Game;
  settings: Settings;

  shipsList: ShipList[];
  shipListIndex: number;
  shipListLayoutIndex: number;

  shedContainer: Container;
  shipGUIContainer: Container;
  shipContainer: Container;
  shipFloorContainer: Container;

  selectedShip: Ship;
  selectedCrewForCustomization: Crew | null = null;

  renameShipEnabled: boolean = false;
  renameCrewEnabled: boolean = false;
  displayRooms: boolean = true;
  shipHaveNoDroneControlSystem: boolean = false;

  showShipsListModal: boolean = false;

  constructor(
    private router: Router,
    private gameService: GameService,
    private settingsService: SettingsService,
    private shipRenderService: ShipRenderService,
    private shipsService: ShipsService,
    private texturesManagerService: TexturesManagerService)
  {
    console.log('shed constructor');

    this.game = this.gameService.getGame();
    this.settings = this.settingsService.getSettings();

    this.difficulties = this.gameService.difficulties;
    this.game.difficulty = this.difficulties[0];

    this.shipsList = this.shipsService.getShips();
    this.shipListIndex = 0;
    this.shipListLayoutIndex = 0;
  }

  ngOnInit() {
    this.initShepPage();

    this.loadSelectedShip(this.shipsList[this.shipListIndex].layouts[this.shipListLayoutIndex]);
    this.loadShepAnimations();
    this.shipHaveNoDroneControlSystem = this.selectedShip.drones.length == 0;
    this.shipRenderService.startShipRender(this.shipContainer, this.shipFloorContainer, this.selectedShip, true, this.shipGUIContainer);
  }

  initShepPage()
  {
    this.app = new Application({ backgroundAlpha: 0, height: this.canvasHeight, width: this.canvasWidth });
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

    this.shedContainer = new Container();
    this.app.stage.addChild(this.shedContainer);

    const shipsListGUIContainer = document.querySelector('.modal') as HTMLElement;
    if (shipsListGUIContainer) {
      shipsListGUIContainer.style.height = `${this.canvasHeight}px`;
      shipsListGUIContainer.style.width = `${this.canvasWidth}px`;
    }
  }

  loadSelectedShip(ship: Ship)
  {
    this.selectedShip = ship;

    this.shipGUIContainer = new Container();

    this.shipContainer = new Container();
    this.shipContainer.x = 300;
    this.shipContainer.y = 0;
    this.shipContainer.height = 400;
    this.shipContainer.width = 660;

    this.shipFloorContainer = new Container();
    this.shipFloorContainer.x = 300;
    this.shipFloorContainer.y = 1;
    this.shipFloorContainer.height = 400;
    this.shipFloorContainer.width = 660;

    this.app.stage.addChild(this.shipGUIContainer, this.shipContainer, this.shipFloorContainer);

    const shipHull = Sprite.from(this.selectedShip.srcHullSprite);
    shipHull.x = this.selectedShip.hullSpriteX - 300; // - 300px is temporary use for positioning floor ship sprite on shed view
    shipHull.y = this.selectedShip.hullSpriteY;

    this.shipContainer.addChild(shipHull);

    let selectedShipFloor = Sprite.from(this.selectedShip.srcInteriorSprite);
    selectedShipFloor.x = this.selectedShip.interiorSpriteX - 300; // - 300px is temporary use for positioning floor ship sprite on shed view
    selectedShipFloor.y = this.selectedShip.interiorSpriteY;

    this.shipFloorContainer.addChild(selectedShipFloor);
  }

  loadShepAnimations()
  {
    const humanMaleSheet = this.texturesManagerService.getSpritesheet('human-male');
    const humanFemaleSheet = this.texturesManagerService.getSpritesheet('human-female');
    const humanAnimationSpeed = .1;

    if (humanMaleSheet && humanFemaleSheet) {
      let animatedShipEngineerSprite = new AnimatedSprite(humanMaleSheet.animations["useComputer_Top"]);
      animatedShipEngineerSprite.x = 100;
      animatedShipEngineerSprite.y = 109;

      let animatedShipEngineerReparingDroneSprite = new AnimatedSprite(humanMaleSheet.animations["repair"]);
      animatedShipEngineerReparingDroneSprite.x = 1120;
      animatedShipEngineerReparingDroneSprite.y = 114;

      let animatedShipEngineerReparingMissileSprite = new AnimatedSprite(humanFemaleSheet.animations["repair"]);
      animatedShipEngineerReparingMissileSprite.x = 1206;
      animatedShipEngineerReparingMissileSprite.y = 332;

      let animatedShipEngineerReparingShipSprite = new AnimatedSprite(humanFemaleSheet.animations["repair"]);
      animatedShipEngineerReparingShipSprite.x = 1100;
      animatedShipEngineerReparingShipSprite.y = 362;

      if (this.settings.dynamicBackground) {
        animatedShipEngineerSprite.animationSpeed = humanAnimationSpeed;
        animatedShipEngineerSprite.play();

        animatedShipEngineerReparingDroneSprite.animationSpeed = humanAnimationSpeed;
        animatedShipEngineerReparingDroneSprite.play();

        animatedShipEngineerReparingMissileSprite.animationSpeed = humanAnimationSpeed;
        animatedShipEngineerReparingMissileSprite.play();

        animatedShipEngineerReparingShipSprite.animationSpeed = humanAnimationSpeed;
        animatedShipEngineerReparingShipSprite.play();
      }

      this.shedContainer.addChild(
        animatedShipEngineerSprite,
        animatedShipEngineerReparingDroneSprite,
        animatedShipEngineerReparingMissileSprite,
        animatedShipEngineerReparingShipSprite,
      );
    }
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

  toggleShipsListModal() {
    this.showShipsListModal = !this.showShipsListModal;
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

  randomShip()
  {
    this.shipListIndex = NumberService.randomIntFromInterval(0, 1);
    this.shipListLayoutIndex = NumberService.randomIntFromInterval(0, 2);

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

    this.toggleShipsListModal();

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

  openCrewCustomization(crew: Crew)
  {
    this.selectedCrewForCustomization = crew;
  }

  closeCrewCustomization()
  {
    this.selectedCrewForCustomization = null;
  }

  openRenameCrewInput()
  {
    this.renameCrewEnabled = true;

    let inputCrewRename = document.querySelector('#inputCrewRename') as HTMLInputElement;
    inputCrewRename.focus();
  }

  closeRenameCrewInput()
  {
    this.renameShipEnabled = false;

    let inputCrewRename = document.querySelector('#inputCrewRename') as HTMLInputElement;
    inputCrewRename.blur();
  }

  toggleShipRooms() {
    this.displayRooms = !this.displayRooms;
    this.shipFloorContainer.visible = this.displayRooms;
  }

  disablePlayButton()
  {
    return this.selectedShip.name == "" || this.crewNamingsIsInvalid();
  }

  startGame() {
    this.game.ship = this.selectedShip;
    this.gameService.storeGame(this.game);

    this.router.navigate(['/game']);
  }

  private crewNamingsIsInvalid(): boolean
  {
    let isInvalid = false;

    for (let crew of this.selectedShip.crews)
    {
      if (!crew.name)
      {
        isInvalid = true;
        break;
      }
    }

    return isInvalid;
  }

}
