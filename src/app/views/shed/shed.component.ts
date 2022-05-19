// import * as PIXI from 'pixi.js' // Many errors on typescript
declare var PIXI: any;

import { Component, OnInit } from '@angular/core';

import { GameService } from '../../core/services/game/game.service';
import { ShipsService } from '../../core/services/ships/ships.service';

import { Gender } from '../../core/models/crew/crew.model';
import { Difficulty } from '../../core/models/difficulty/difficulty.model';
import { Game } from '../../core/models/game/game.model';
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
  canvasRatio: number; // 720 / 1280 = 0.5625

  ctx: CanvasRenderingContext2D;

  difficulties: Difficulty[];

  game: Game;

  ships: ShipList[];
  shipListIndex: number = 0;

  shipContainer: any;

  selectedShip: Ship;
  selectedShipFloor: any;

  renameShipEnabled: boolean = false;
  displayRooms: boolean = true;
  shipHaveNoDroneControlSystem: boolean = false;

  constructor(
    private gameService: GameService,
    private shipsService: ShipsService)
  {
    // TODO extract canvas managemnet on dedicated file / service
    this.canvasRatio = this.canvasHeight / this.canvasWidth;

    this.gameService.newGame(); // TEMP
    this.game = this.gameService.game;

    this.difficulties = this.gameService.difficulties;
    this.game.difficulty = this.difficulties[0];

    this.ships = this.shipsService.getShips();
  }

  ngOnInit(): void {
    this.initShepCanvas();

    this.loadSelectedShip(this.ships[this.shipListIndex].layouts[0]);

    let setup = () => {
      this.loadSystemsGUIofShip(this.selectedShip);
      this.loadCrewsGUIofShip(this.selectedShip);
      this.loadWeasponsGUIofShip(this.selectedShip);
      this.loadDronesGUIofShip(this.selectedShip);
      this.loadUpgradesGUIOfShip(this.selectedShip);
    }

    PIXI.Loader.shared
      .add("/assets/images/peoples/crystal/crystal-base-spritesheet.json")
      .add("/assets/images/peoples/engi/engi-base-spritesheet.json")
      .add("/assets/images/peoples/human-female/human-female-base-spritesheet.json")
      .add("/assets/images/peoples/human-male/human-male-base-spritesheet.json")
      .add("/assets/images/peoples/lanius/lanius-base-spritesheet.json")
      .add("/assets/images/peoples/mantis/mantis-base-spritesheet.json")
      .add("/assets/images/peoples/rockmen/rockmen-base-spritesheet.json")
      .add("/assets/images/peoples/zoltan/zoltan-base-spritesheet.json")
      .load(setup);
  }

  initShepCanvas()
  {
    this.app = new PIXI.Application({ backgroundAlpha: 0, height: this.canvasHeight, width: this.canvasWidth });
    document.querySelector('#canvsPixi')!.appendChild(this.app.view);

    const shedBody = document.querySelector('.shed') as HTMLElement;
    shedBody.style.height = `${this.canvasHeight}px`;
    shedBody.style.width = `${this.canvasWidth}px`;

    const shedGUIContainer = document.querySelector('.shed-gui-container') as HTMLElement;
    shedGUIContainer.style.height = `${this.canvasHeight}px`;
    shedGUIContainer.style.width = `${this.canvasWidth}px`;

    const shedCanvas = document.querySelector('#shedCanvas') as HTMLCanvasElement;
    shedCanvas.height = this.canvasHeight;
    shedCanvas.width = this.canvasWidth;

    this.ctx = shedCanvas.getContext('2d') as CanvasRenderingContext2D;
  }

  loadSelectedShip(ship: Ship)
  {
    this.selectedShip = ship;

    this.shipContainer = new PIXI.Container();
    this.app.stage.addChild(this.shipContainer);

    const shipHull = PIXI.Sprite.from(this.selectedShip.srcHullSprite);
    shipHull.x = 300;
    shipHull.y = 0;

    this.selectedShipFloor = PIXI.Sprite.from(this.selectedShip.srcInteriorSprite);
    this.selectedShipFloor.x = 350;
    this.selectedShipFloor.y = 97;

    this.shipContainer.addChild(shipHull, this.selectedShipFloor);

    // TODO animate thrusters and extract
    if (ship.originalName == 'The Kestrel' || ship.originalName == 'Red-Tail' || ship.originalName == 'The Swallow')
    {
      const thrustersLeftImage = PIXI.Sprite.from('/assets/images/effects/thrusters_on_img.png');
      thrustersLeftImage.x = 360;
      thrustersLeftImage.y = 40;

      const thrustersRightImage = PIXI.Sprite.from('/assets/images/effects/thrusters_on_img.png');
      thrustersRightImage.x = 360;
      thrustersRightImage.y = 305;

      this.shipContainer.addChild(thrustersLeftImage, thrustersRightImage);
    }
  }

  loadSystemsGUIofShip(ship: Ship)
  {
    for (let i = 0; i < ship.rooms.length; i++) {
      let shipSystemGUI = PIXI.Sprite.from('/assets/images/gui/box_system_on.png');
      shipSystemGUI.x = 380 + (i * 38);
      shipSystemGUI.y = 382;

      let shipSystemIconGUI = PIXI.Sprite.from(ship.rooms[i].affectedSystem.srcSystemGreenSprite);
      shipSystemIconGUI.x = 367 + (i * 38);
      shipSystemIconGUI.y = 427;

      this.shipContainer.addChild(shipSystemGUI, shipSystemIconGUI);

      for (let y = 0; y < ship.rooms[i].affectedSystem.level; y++) {
        let shipSystemLevel = new PIXI.Graphics()
        shipSystemLevel.beginFill(0x3ff33c);
        shipSystemLevel.drawRect(391.5 + (i * 38), 435 + (y * -7), 15, 5);

        this.shipContainer.addChild(shipSystemLevel);
      }
    }
  }

  // TODO extract to races service
  getRaceSheetForRace(name: string)
  {
    switch (name)
    {
      case 'crystal':
        return PIXI.Loader.shared.resources["/assets/images/peoples/crystal/crystal-base-spritesheet.json"].spritesheet;

      case 'engi':
        return PIXI.Loader.shared.resources["/assets/images/peoples/engi/engi-base-spritesheet.json"].spritesheet;

      case 'human-female':
        return PIXI.Loader.shared.resources["/assets/images/peoples/human-female/human-female-base-spritesheet.json"].spritesheet;

      case 'human-male':
        return PIXI.Loader.shared.resources["/assets/images/peoples/human-male/human-male-base-spritesheet.json"].spritesheet;

      case 'lanius':
        return PIXI.Loader.shared.resources["/assets/images/peoples/lanius/lanius-base-spritesheet.json"].spritesheet;

      case 'mantis':
        return PIXI.Loader.shared.resources["/assets/images/peoples/mantis/mantis-base-spritesheet.json"].spritesheet;

      case 'rockmen':
        return PIXI.Loader.shared.resources["/assets/images/peoples/rockmen/rockmen-base-spritesheet.json"].spritesheet;

      case 'zoltan':
        return PIXI.Loader.shared.resources["/assets/images/peoples/zoltan/zoltan-base-spritesheet.json"].spritesheet;
    }
  }

  loadCrewsGUIofShip(ship: Ship)
  {
    for (let i = 0; i < 2; i++) {
      let shipCrewLineOneGUI = PIXI.Sprite.from(`/assets/images/gui/box_crew_${ i < ship.crews.length ? 'on' : 'off'}.png`);
      shipCrewLineOneGUI.x = 60 + (i * 150);
      shipCrewLineOneGUI.y = 530;

      this.shipContainer.addChild(shipCrewLineOneGUI);

      let crewMember = ship.crews[i];

      if (crewMember)
      {
        let raceName = crewMember.race.name.toLowerCase();

        if (raceName == 'human')
        {
          raceName = `${raceName}-${crewMember.gender == Gender.Male ? 'male' : 'female'}`;
        }

        let crewMemberLineOne = PIXI.Sprite.from(this.getRaceSheetForRace(raceName).textures[`${raceName}_base-0.png`]);
        crewMemberLineOne.x = 112 + (i * 150);
        crewMemberLineOne.y = 558;
        crewMemberLineOne.height = 60;
        crewMemberLineOne.width = 60;

        this.shipContainer.addChild(crewMemberLineOne);
      }
    }

    for (let y = 0; y < 2; y++) {
      let shipCrewLineTwoGUI = PIXI.Sprite.from(`/assets/images/gui/box_crew_${ y + 2 < ship.crews.length ? 'on' : 'off'}.png`);
      shipCrewLineTwoGUI.x = 60 + (y * 150);
      shipCrewLineTwoGUI.y = 620;

      this.shipContainer.addChild(shipCrewLineTwoGUI);

      let crewMember = ship.crews[y + 2];

      if (crewMember)
      {
        let raceName = crewMember.race.name.toLowerCase();

        if (raceName == 'human')
        {
          raceName = `${raceName}-${crewMember.gender == Gender.Male ? 'male' : 'female'}`;
        }

        let crewMemberLineTwo = PIXI.Sprite.from(this.getRaceSheetForRace(raceName).textures[`${raceName}_base-0.png`]);
        crewMemberLineTwo.x = 112 + (y * 150);
        crewMemberLineTwo.y = 648;
        crewMemberLineTwo.height = 60;
        crewMemberLineTwo.width = 60;

        this.shipContainer.addChild(crewMemberLineTwo);
      }
    }
  }

  loadWeasponsGUIofShip(ship: Ship)
  {
    for (let i = 0; i < ship.maxWeaponsAllowed; i++) {
      let shipWeaponGUI = PIXI.Sprite.from(`/assets/images/gui/box_weapons_${ i < ship.weapons.length ? 'on' : 'off'}.png`);
      shipWeaponGUI.x = 425 + (i * 120);
      shipWeaponGUI.y = 515;

      this.shipContainer.addChild(shipWeaponGUI);
    }

    // TODO display weapons
  }

  loadDronesGUIofShip(ship: Ship)
  {
    this.shipHaveNoDroneControlSystem = this.selectedShip.drones.length == 0;

    if (this.selectedShip.drones.length > 0)
    {
      for (let i = 0; i < ship.maxDronesAllowed; i++) {
        let shipDroneGUI = PIXI.Sprite.from(`/assets/images/gui/box_drones_${ i < ship.drones.length ? 'on' : 'off'}.png`);
        shipDroneGUI.x = 425 + (i * 120);
        shipDroneGUI.y = 625;

        this.shipContainer.addChild(shipDroneGUI);
      }

      // TODO display drones
    }
  }

  loadUpgradesGUIOfShip(ship: Ship)
  {
    for (let i = 0; i < ship.maxUpgradesAllowed; i++) {
      let shipDroneGUI = PIXI.Sprite.from(`/assets/images/gui/box_augment_${ i < ship.upgrades.length ? 'on' : 'off'}.png`);
      shipDroneGUI.x = 990;
      shipDroneGUI.y = 529 + (i * 60);

      this.shipContainer.addChild(shipDroneGUI);
    }

    if (ship.upgrades.length > 0)
    {
      // TODO display upgrades
    }
  }

  previousShip()
  {
    this.shipListIndex--;

    if (this.shipListIndex < 0)
    {
      this.shipListIndex = this.ships.length - 1;
    }

    this.selectShip(this.ships[this.shipListIndex].layouts[0]);
  }

  openShipsList()
  {
    // TODO
  }

  nextShip()
  {
    this.shipListIndex++;

    if (this.shipListIndex > this.ships.length - 1)
    {
      this.shipListIndex = 0;
    }

    this.selectShip(this.ships[this.shipListIndex].layouts[0]);
  }

  selectShip(ship: Ship)
  {
    if (ship != this.selectedShip)
    {
      this.shipContainer.destroy();

      ship.resetName();

      this.loadSelectedShip(ship);

      this.loadSystemsGUIofShip(this.selectedShip);
      this.loadCrewsGUIofShip(this.selectedShip);
      this.loadWeasponsGUIofShip(this.selectedShip);
      this.loadDronesGUIofShip(this.selectedShip);
      this.loadUpgradesGUIOfShip(this.selectedShip);
    }
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
    this.selectedShipFloor.visible = this.displayRooms;
  }

  toggleAdvancedEditionContentActivation() {
    this.game.advancedEditionEnabled = !this.game.advancedEditionEnabled;
  }

  startGame() {
    this.game.ship = this.selectedShip;

    console.log('Start game, include in future version', this.game);
  }

}
