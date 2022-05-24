// import * as PIXI from 'pixi.js' // Many errors on typescript
declare var PIXI: any;

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GameService } from '../../core/services/game/game.service';
import { ShipsService } from '../../core/services/ships/ships.service';

import { Gender } from '../../core/models/crew/crew.model';
import { Difficulty } from '../../core/models/difficulty/difficulty.model';
import { Game } from '../../core/models/game/game.model';
import { KestrelShip, Ship, ShipList } from '../../core/models/ships/index';
import { SystemPositionEnum, Teleport } from '../../core/models/systems/index';
import { DEFAULT_TILE_HEIGHT, DEFAULT_TILE_WIDTH } from '../../core/models/room/roomDisplaySettings.model';

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

  ships: ShipList[];
  shipListIndex: number = 0;

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
    private shipsService: ShipsService)
  {
    this.game = this.gameService.newGame();

    this.difficulties = this.gameService.difficulties;
    this.game.difficulty = this.difficulties[0];

    this.ships = this.shipsService.getShips();
  }

  ngOnInit(): void {
    this.initShepCanvas();

    this.loadSelectedShip(this.ships[this.shipListIndex].layouts[0]);

    let setup = () => {
      this.loadShepAnimations();

      this.loadThrustersAnimation();

      this.loadSystemsGUIofShip(this.selectedShip);
      this.loadCrewsGUIofShip(this.selectedShip);
      this.loadWeasponsGUIofShip(this.selectedShip);
      this.loadDronesGUIofShip(this.selectedShip);
      this.loadUpgradesGUIOfShip(this.selectedShip);

      this.loadRoomsGUIofShip(this.selectedShip);
      this.loadDoorsGUIofShip(this.selectedShip);
    }

    PIXI.Loader.shared
      .add("/assets/images/effects/thrusters_on.json")
      .add("/assets/images/peoples/crystal/crystal-base-spritesheet.json")
      .add("/assets/images/peoples/engi/engi-base-spritesheet.json")
      .add("/assets/images/peoples/human-female/human-female-base-spritesheet.json")
      .add("/assets/images/peoples/human-male/human-male-base-spritesheet.json")
      .add("/assets/images/peoples/lanius/lanius-base-spritesheet.json")
      .add("/assets/images/peoples/mantis/mantis-base-spritesheet.json")
      .add("/assets/images/peoples/rockmen/rockmen-base-spritesheet.json")
      .add("/assets/images/peoples/slug/slug-base-spritesheet.json")
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

    this.shedContainer = new PIXI.Container();
    this.app.stage.addChild(this.shedContainer);
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

  loadThrustersAnimation()
  {
    if (this.selectedShip instanceof KestrelShip)
    {
      const thrustersOnSheet = PIXI.Loader.shared.resources["/assets/images/effects/thrusters_on.json"].spritesheet;
      const thrustersAnimationSpeed = .08;

      let animatedThrustersLeftSprite = new PIXI.AnimatedSprite(thrustersOnSheet.animations["thrusters_on"]);
      animatedThrustersLeftSprite.x = 72;
      animatedThrustersLeftSprite.y = 75;
      animatedThrustersLeftSprite.animationSpeed = thrustersAnimationSpeed;
      animatedThrustersLeftSprite.play();

      let animatedThrustersRightSprite = new PIXI.AnimatedSprite(thrustersOnSheet.animations["thrusters_on"]);
      animatedThrustersRightSprite.x = 72;
      animatedThrustersRightSprite.y = 340;
      animatedThrustersRightSprite.animationSpeed = thrustersAnimationSpeed;
      animatedThrustersRightSprite.play();

      this.shipContainer.addChild(animatedThrustersLeftSprite, animatedThrustersRightSprite);
    }
  }

  loadSystemsGUIofShip(ship: Ship)
  {
    for (let i = 0; i < ship.rooms.length; i++) {
      let shipSystemGUI = PIXI.Sprite.from('/assets/images/gui/box_system_on.png');
      shipSystemGUI.x = 380 + (i * 38);
      shipSystemGUI.y = 382;

      let room = ship.rooms[i];

      if (room.affectedSystem && room.affectedSystem.isInstalled)
      {
        let shipSystemIconGUI = PIXI.Sprite.from(room.affectedSystem!.srcSystemGreenSprite);
        shipSystemIconGUI.x = 367 + (i * 38);
        shipSystemIconGUI.y = 427;

        this.shipGUIContainer.addChild(shipSystemGUI, shipSystemIconGUI);

        for (let y = 0; y < room.affectedSystem!.level; y++) {
          let shipSystemLevel = new PIXI.Graphics()
          shipSystemLevel
            .beginFill(0x3ff33c)
            .drawRect(391.5 + (i * 38), 435 + (y * -7), 15, 5)
            .endFill();

          this.shipGUIContainer.addChild(shipSystemLevel);
        }
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

      case 'slug':
        return PIXI.Loader.shared.resources["/assets/images/peoples/slug/slug-base-spritesheet.json"].spritesheet;

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

      this.shipGUIContainer.addChild(shipCrewLineOneGUI);

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

        this.shipGUIContainer.addChild(crewMemberLineOne);
      }
    }

    for (let y = 0; y < 2; y++) {
      let shipCrewLineTwoGUI = PIXI.Sprite.from(`/assets/images/gui/box_crew_${ y + 2 < ship.crews.length ? 'on' : 'off'}.png`);
      shipCrewLineTwoGUI.x = 60 + (y * 150);
      shipCrewLineTwoGUI.y = 620;

      this.shipGUIContainer.addChild(shipCrewLineTwoGUI);

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

        this.shipGUIContainer.addChild(crewMemberLineTwo);
      }
    }
  }

  loadWeasponsGUIofShip(ship: Ship)
  {
    for (let i = 0; i < ship.maxWeaponsAllowed; i++) {
      let shipWeaponGUI = PIXI.Sprite.from(`/assets/images/gui/box_weapons_${ i < ship.weapons.length ? 'on' : 'off'}.png`);
      shipWeaponGUI.x = 425 + (i * 120);
      shipWeaponGUI.y = 515;

      this.shipGUIContainer.addChild(shipWeaponGUI);
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

        this.shipGUIContainer.addChild(shipDroneGUI);
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

      this.shipGUIContainer.addChild(shipDroneGUI);
    }

    if (ship.upgrades.length > 0)
    {
      // TODO display upgrades
    }
  }

  loadRoomsGUIofShip(ship: Ship)
  {
    for (let room of ship.rooms) {
      let roomTileBorder = new PIXI.Graphics()
        .beginFill(0x000000)
        .drawRect(room.roomDisplaySettings.x - 2, room.roomDisplaySettings.y - 2, room.roomDisplaySettings.height + 4, room.roomDisplaySettings.width + 4)
        .endFill();

      room.roomTile = new PIXI.Graphics()
        .beginFill(0xe6e2db)
        .drawRect(room.roomDisplaySettings.x, room.roomDisplaySettings.y, room.roomDisplaySettings.height, room.roomDisplaySettings.width)
        .endFill();

      this.shipFloorContainer.addChild(roomTileBorder, room.roomTile);

      // Compute Room grid
      if (room.roomDisplaySettings.sizeX > 1)
      {
        for (let verticalLineIndex = 1; verticalLineIndex < room.roomDisplaySettings.sizeX; verticalLineIndex++) {
          let roomTileSlotLine = new PIXI.Graphics()
            .beginFill(0xb4b1ac)
            .drawRect(room.roomDisplaySettings.x + (verticalLineIndex * DEFAULT_TILE_HEIGHT), room.roomDisplaySettings.y, 1, room.roomDisplaySettings.width)
            .endFill();

          this.shipFloorContainer.addChild(roomTileSlotLine);
        }
      }

      if (room.roomDisplaySettings.sizeY > 1)
      {
        for (let horizontalLineIndex = 1; horizontalLineIndex < room.roomDisplaySettings.sizeY; horizontalLineIndex++) {
          let roomTileSlotLine = new PIXI.Graphics()
            .beginFill(0xb4b1ac)
            .drawRect(room.roomDisplaySettings.x, room.roomDisplaySettings.y + (horizontalLineIndex * DEFAULT_TILE_WIDTH), room.roomDisplaySettings.height, 1)
            .endFill();

          this.shipFloorContainer.addChild(roomTileSlotLine);
        }
      }

      room.noOxygenInRoomSprite = new PIXI.Sprite.from(`/assets/images/effects/low_o2_stripes_${room.roomDisplaySettings.sizeX}x${room.roomDisplaySettings.sizeY}.png`);
      room.noOxygenInRoomSprite.x = room.roomDisplaySettings.x - 2;
      room.noOxygenInRoomSprite.y = room.roomDisplaySettings.y - 2;
      room.noOxygenInRoomSprite.visible = room.oxygen == 0;
      this.shipFloorContainer.addChild(room.noOxygenInRoomSprite);

      if (room.affectedSystem)
      {
        if (room.affectedSystem.srcSystemInRoomSprite)
        {
          if (room.affectedSystem instanceof Teleport)
          {
            for (let i = 0; i < room.roomDisplaySettings.sizeX; i++) {
              for (let y = 0; y < room.roomDisplaySettings.sizeY; y++) {
                let roomTeleportSystemInterior = new PIXI.Sprite.from(room.affectedSystem.srcSystemInRoomSprite);
                roomTeleportSystemInterior.x = room.roomDisplaySettings.x + 4 + (i * DEFAULT_TILE_WIDTH); // 4px for center teleport sprite texture
                roomTeleportSystemInterior.y = room.roomDisplaySettings.y + 4 + (y * DEFAULT_TILE_HEIGHT);
                roomTeleportSystemInterior.alpha = room.affectedSystem.isInstalled ? 1 : .5;

                this.shipFloorContainer.addChild(roomTeleportSystemInterior);
              }
            }
          }
          else
          {
            let roomSystemInterior = new PIXI.Sprite.from(room.affectedSystem.srcSystemInRoomSprite);
            roomSystemInterior.x = room.roomDisplaySettings.x - 2;
            roomSystemInterior.y = room.roomDisplaySettings.y - 2;
            roomSystemInterior.alpha = room.affectedSystem.isInstalled ? 1 : .5;

            this.shipFloorContainer.addChild(roomSystemInterior);
          }
        }

        let roomSystemIcon = new PIXI.Sprite.from(room.affectedSystem.srcSystemOverlaySprite);
        roomSystemIcon.x = room.roomDisplaySettings.getRoomSystemIconPositionX();
        roomSystemIcon.y = room.roomDisplaySettings.getRoomSystemIconPositionY();
        roomSystemIcon.alpha = room.affectedSystem.isInstalled ? 1 : .5;

        this.shipFloorContainer.addChild(roomSystemIcon);

        if (room.affectedCrew) {
          let raceName = room.affectedCrew.race.name.toLowerCase();

          if (raceName == 'human')
          {
            raceName = `${raceName}-${room.affectedCrew.gender == Gender.Male ? 'male' : 'female'}`;
          }

          const raceSpeed = .1;

          let crewMemberAnimationName;

          switch (room.affectedSystem.systemPosition)
          {
            default:
            case SystemPositionEnum.Top:
              crewMemberAnimationName = "useComputer_Top";
              break;

            case SystemPositionEnum.Right:
              crewMemberAnimationName = "useComputer_Right";
              break;

            case SystemPositionEnum.Bottom:
              crewMemberAnimationName = "useComputer_Bottom";
              break;

            case SystemPositionEnum.Left:
              crewMemberAnimationName = "useComputer_Left";
              break;
          }

          let crewMember = new PIXI.AnimatedSprite(this.getRaceSheetForRace(raceName).animations[crewMemberAnimationName]);
          crewMember.x = room.roomDisplaySettings.x + 10;
          crewMember.y = room.roomDisplaySettings.y + 10;
          crewMember.animationSpeed = raceSpeed;
          crewMember.play();

          this.shipFloorContainer.addChild(crewMember);
        }
      }
    }
  }

  loadDoorsGUIofShip(ship: Ship)
  {
    for (let i = 0; i < ship.doors.length; i++) {
      let door = ship.doors[i];

      let doorSprite = new PIXI.Sprite.from(door.getSrcDoorSprite());
      doorSprite.x = door.x;
      doorSprite.y = door.y;

      if (door.rotation)
      {
        doorSprite.angle = door.rotation;
      }

      this.shipFloorContainer.addChild(doorSprite);
    }
  }

  loadShepAnimations()
  {
    const humanMaleSheet = this.getRaceSheetForRace('human-male');
    const humanFemaleSheet = this.getRaceSheetForRace('human-female');
    const humanAnimationSpeed = .1;

    let animatedShipEngineerSprite = new PIXI.AnimatedSprite(humanMaleSheet.animations["useComputer_Top"]);
    animatedShipEngineerSprite.x = 100;
    animatedShipEngineerSprite.y = 109;
    animatedShipEngineerSprite.animationSpeed = humanAnimationSpeed;
    animatedShipEngineerSprite.play();

    let animatedShipEngineerReparingDroneSprite = new PIXI.AnimatedSprite(humanMaleSheet.animations["repair"]);
    animatedShipEngineerReparingDroneSprite.x = 1120;
    animatedShipEngineerReparingDroneSprite.y = 114;
    animatedShipEngineerReparingDroneSprite.animationSpeed = humanAnimationSpeed;
    animatedShipEngineerReparingDroneSprite.play();

    let animatedShipEngineerReparingShipSprite = new PIXI.AnimatedSprite(humanFemaleSheet.animations["repair"]);
    animatedShipEngineerReparingShipSprite.x = 1100;
    animatedShipEngineerReparingShipSprite.y = 362;
    animatedShipEngineerReparingShipSprite.animationSpeed = humanAnimationSpeed;
    animatedShipEngineerReparingShipSprite.play();

    this.shedContainer.addChild(animatedShipEngineerSprite, animatedShipEngineerReparingDroneSprite, animatedShipEngineerReparingShipSprite);
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
      this.shipGUIContainer.destroy();
      this.shipContainer.destroy();
      this.shipFloorContainer.destroy();

      ship.resetName();

      this.displayRooms = true;

      this.loadSelectedShip(ship);

      this.loadThrustersAnimation();

      this.loadSystemsGUIofShip(this.selectedShip);
      this.loadCrewsGUIofShip(this.selectedShip);
      this.loadWeasponsGUIofShip(this.selectedShip);
      this.loadDronesGUIofShip(this.selectedShip);
      this.loadUpgradesGUIOfShip(this.selectedShip);

      this.loadRoomsGUIofShip(this.selectedShip);
      this.loadDoorsGUIofShip(this.selectedShip);
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
