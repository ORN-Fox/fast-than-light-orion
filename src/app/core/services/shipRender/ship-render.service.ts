import { AnimatedSprite, Container, Graphics, Loader, Sprite, Text, TextStyle } from 'pixi.js';

import { Injectable } from '@angular/core';

import { TexturesManagerService } from '../textures-manager/textures-manager.service';

import { KestrelShip, Ship } from '../../models/ships/index';
import { BORDER_TILE_SIZE, TILE_SIZE_WITH_BORDER, Room } from '../../models/room/index';
import { SystemPositionEnum, Teleport } from '../../models/systems/index';

export const MAX_SHIP_SLOT_X = 22, MAX_SHIP_SLOT_Y = 14;

@Injectable({
  providedIn: 'root'
})
export class ShipRenderService {

  constructor(private texturesManagerService: TexturesManagerService)
  {}

  startShipRender(shipContainer: Container, shipFloorContainer: Container, ship: Ship, isShedMode: boolean = false, shipGUIContainer: Container | null = null)
  {
    this.loadThrustersAnimation(shipContainer, ship);

    if (isShedMode)
    {
      if (shipGUIContainer)
      {
        this.loadSystemsGUIofShip(shipGUIContainer, ship);
        this.loadCrewsGUIofShip(shipGUIContainer, ship);
        this.loadWeasponsGUIofShip(shipGUIContainer, ship);
        this.loadDronesGUIofShip(shipGUIContainer, ship);
        this.loadUpgradesGUIOfShip(shipGUIContainer, ship);
      }
    }

    this.loadRoomsGUIofShip(shipFloorContainer, ship, isShedMode);
    this.loadDoorsGUIofShip(shipFloorContainer, ship);

    // Dev mode
    // this.loadShipDevGridGUI(shipFloorContainer);
  }

  loadThrustersAnimation(shipContainer: Container, ship: Ship)
  {
    if (ship instanceof KestrelShip)
    {
      const thrustersOnSheet = Loader.shared.resources["/assets/images/effects/thrusters_on.json"].spritesheet as any;
      const thrustersAnimationSpeed = .12;

      let animatedThrustersLeftSprite = new AnimatedSprite(thrustersOnSheet.animations["thrusters_on"]);
      animatedThrustersLeftSprite.x = 72;
      animatedThrustersLeftSprite.y = 75;
      animatedThrustersLeftSprite.animationSpeed = thrustersAnimationSpeed;
      animatedThrustersLeftSprite.play();

      let animatedThrustersRightSprite = new AnimatedSprite(thrustersOnSheet.animations["thrusters_on"]);
      animatedThrustersRightSprite.x = 72;
      animatedThrustersRightSprite.y = 340;
      animatedThrustersRightSprite.animationSpeed = thrustersAnimationSpeed;
      animatedThrustersRightSprite.play();

      shipContainer.addChild(animatedThrustersLeftSprite, animatedThrustersRightSprite);
    }
  }

  loadRoomsGUIofShip(shipFloorContainer: Container, ship: Ship, isShedMode: boolean)
  {
    for (let room of ship.rooms) {
      room.roomTile = new Graphics()
        .lineStyle(BORDER_TILE_SIZE, 0x000000)
        .beginFill(room.getBackgroundColorForOxygenLevel())
        .drawRect(room.roomDisplaySettings.getRoomTilePositionX(), room.roomDisplaySettings.getRoomTilePositionY(), room.roomDisplaySettings.width, room.roomDisplaySettings.height)
        .endFill();

      shipFloorContainer.addChild(room.roomTile);

      this.loadRoomGrid(shipFloorContainer, room);

      room.noOxygenInRoomSprite = Sprite.from(`/assets/images/effects/low_o2_stripes_${room.roomDisplaySettings.sizeX}x${room.roomDisplaySettings.sizeY}.png`);
      room.noOxygenInRoomSprite.x = room.roomDisplaySettings.getRoomTilePositionX();
      room.noOxygenInRoomSprite.y = room.roomDisplaySettings.getRoomTilePositionY();
      room.noOxygenInRoomSprite.height = room.roomDisplaySettings.height;
      room.noOxygenInRoomSprite.width = room.roomDisplaySettings.width;
      room.noOxygenInRoomSprite.visible = room.criticalOxygenLevel();
      shipFloorContainer.addChild(room.noOxygenInRoomSprite);

      if (room.affectedSystem)
      {
        if (isShedMode ? true : room.affectedSystem.isInstalled)
        {
          if (room.affectedSystem.srcSystemInRoomSprite)
          {
            if (room.affectedSystem instanceof Teleport)
            {
              for (let i = 0; i < room.roomDisplaySettings.sizeX; i++) {
                for (let y = 0; y < room.roomDisplaySettings.sizeY; y++) {
                  let roomTeleportSystemInterior = Sprite.from(room.affectedSystem.srcSystemInRoomSprite);
                  roomTeleportSystemInterior.x = room.roomDisplaySettings.getRoomTilePositionX() + (i * TILE_SIZE_WITH_BORDER) + 5; // 5px for center teleport sprite
                  roomTeleportSystemInterior.y = room.roomDisplaySettings.getRoomTilePositionY() + (y * TILE_SIZE_WITH_BORDER) + 5; // 5px for center teleport sprite
                  roomTeleportSystemInterior.alpha = room.affectedSystem.isInstalled ? 1 : .5;

                  shipFloorContainer.addChild(roomTeleportSystemInterior);
                }
              }
            }
            else
            {
              let roomSystemInterior = Sprite.from(room.affectedSystem.srcSystemInRoomSprite);
              roomSystemInterior.x = room.roomDisplaySettings.getRoomTilePositionX();
              roomSystemInterior.y = room.roomDisplaySettings.getRoomTilePositionY();
              roomSystemInterior.alpha = room.affectedSystem.isInstalled ? 1 : .5;

              shipFloorContainer.addChild(roomSystemInterior);
            }
          }

          let roomSystemIcon = Sprite.from(room.affectedSystem.srcSystemOverlaySprite);
          roomSystemIcon.x = room.roomDisplaySettings.getRoomSystemIconPositionX();
          roomSystemIcon.y = room.roomDisplaySettings.getRoomSystemIconPositionY();
          roomSystemIcon.alpha = room.affectedSystem.isInstalled ? 1 : .5;

          shipFloorContainer.addChild(roomSystemIcon);

          if (room.affectedCrew) {
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

            for (let i = 0; i < ship.shipRepresentation.length; i++) {
              for (let y = 0; y < ship.shipRepresentation[i].length; y++) {
                let slot = ship.shipRepresentation[i][y];

                // Affected crew rendering
                if (slot && slot.crew && slot.crew.id == room.affectedCrew.id)
                {
                  let crewMember = new AnimatedSprite(this.texturesManagerService.getRaceSheetForRace(room.affectedCrew.getRaceNameWithGender().toLowerCase()).animations[crewMemberAnimationName]);
                  crewMember.x = room.roomDisplaySettings.getRoomTilePositionX() + (TILE_SIZE_WITH_BORDER * slot.slotPositionX) + 17.5; // 17.5 = 35 / 2 for position crew in center of slot
                  crewMember.y = room.roomDisplaySettings.getRoomTilePositionY() + (TILE_SIZE_WITH_BORDER * slot.slotPositionY) + 17.5;
                  crewMember.animationSpeed = raceSpeed;
                  crewMember.play();

                  shipFloorContainer.addChild(crewMember);

                  break;
                }
              }
            }
          }
        }
      }
    }
  }

  loadRoomGrid(shipFloorContainer: Container, room: Room)
  {
    if (room.roomDisplaySettings.sizeX > 1)
    {
      for (let verticalLineIndex = 1; verticalLineIndex < room.roomDisplaySettings.sizeX; verticalLineIndex++) {
        let roomTileSlotLine = new Graphics()
          .beginFill(0xb4b1ac)
          .drawRect(room.roomDisplaySettings.getRoomTilePositionX() + (verticalLineIndex * TILE_SIZE_WITH_BORDER), room.roomDisplaySettings.getRoomTilePositionY(), 1, room.roomDisplaySettings.height)
          .endFill();

        shipFloorContainer.addChild(roomTileSlotLine);
      }
    }

    if (room.roomDisplaySettings.sizeY > 1)
    {
      for (let horizontalLineIndex = 1; horizontalLineIndex < room.roomDisplaySettings.sizeY; horizontalLineIndex++) {
        let roomTileSlotLine = new Graphics()
          .beginFill(0xb4b1ac)
          .drawRect(room.roomDisplaySettings.getRoomTilePositionX(), room.roomDisplaySettings.getRoomTilePositionY() + (horizontalLineIndex * TILE_SIZE_WITH_BORDER), room.roomDisplaySettings.width, 1)
          .endFill();

        shipFloorContainer.addChild(roomTileSlotLine);
      }
    }
  }

  loadDoorsGUIofShip(shipFloorContainer: Container, ship: Ship)
  {
    for (let i = 0; i < ship.doors.length; i++) {
      let door = ship.doors[i];

      let doorSprite = Sprite.from(door.getSrcDoorSprite());
      doorSprite.x = door.x * TILE_SIZE_WITH_BORDER;
      doorSprite.y = door.y * TILE_SIZE_WITH_BORDER;

      if (door.rotation)
      {
        doorSprite.angle = door.rotation;
      }

      shipFloorContainer.addChild(doorSprite);
    }
  }

  //
  // Shed mode related - specific for shed view
  //

  loadSystemsGUIofShip(shipGUIContainer: Container, ship: Ship)
  {
    for (let i = 0; i < ship.rooms.length; i++) {
      let shipSystemGUI = Sprite.from('/assets/images/gui/box_system_on.png');
      shipSystemGUI.x = 380 + (i * 38);
      shipSystemGUI.y = 382;

      let room = ship.rooms[i];

      if (room.affectedSystem && room.affectedSystem.isInstalled)
      {
        let shipSystemIconGUI = Sprite.from(room.affectedSystem!.srcSystemGreenSprite);
        shipSystemIconGUI.x = 367 + (i * 38);
        shipSystemIconGUI.y = 427;

        shipGUIContainer.addChild(shipSystemGUI, shipSystemIconGUI);

        for (let y = 0; y < room.affectedSystem!.level; y++) {
          let shipSystemLevel = new Graphics()
          shipSystemLevel
            .beginFill(0x3ff33c)
            .drawRect(391.5 + (i * 38), 435 + (y * -7), 15, 5)
            .endFill();

          shipGUIContainer.addChild(shipSystemLevel);
        }
      }
    }
  }

  loadCrewsGUIofShip(shipGUIContainer: Container, ship: Ship)
  {
    for (let i = 0; i < 2; i++) {
      let shipCrewLineOneGUI = Sprite.from(`/assets/images/gui/box_crew_${ i < ship.crews.length ? 'on' : 'off'}.png`);
      shipCrewLineOneGUI.x = 60 + (i * 150);
      shipCrewLineOneGUI.y = 530;

      shipGUIContainer.addChild(shipCrewLineOneGUI);

      let crewMember = ship.crews[i];

      if (crewMember)
      {
        let raceName = crewMember.getRaceNameWithGender().toLowerCase();

        let crewMemberLineOne = Sprite.from(this.texturesManagerService.getRaceSheetForRace(raceName).animations['portrait'][0]);
        crewMemberLineOne.x = 112 + (i * 150);
        crewMemberLineOne.y = 558;
        crewMemberLineOne.height = 60;
        crewMemberLineOne.width = 60;

        shipGUIContainer.addChild(crewMemberLineOne);
      }
    }

    for (let y = 0; y < 2; y++) {
      let shipCrewLineTwoGUI = Sprite.from(`/assets/images/gui/box_crew_${ y + 2 < ship.crews.length ? 'on' : 'off'}.png`);
      shipCrewLineTwoGUI.x = 60 + (y * 150);
      shipCrewLineTwoGUI.y = 620;

      shipGUIContainer.addChild(shipCrewLineTwoGUI);

      let crewMember = ship.crews[y + 2];

      if (crewMember)
      {
        let raceName = crewMember.getRaceNameWithGender().toLowerCase();

        let crewMemberLineTwo = Sprite.from(this.texturesManagerService.getRaceSheetForRace(raceName).animations['portrait'][0]);
        crewMemberLineTwo.x = 112 + (y * 150);
        crewMemberLineTwo.y = 648;
        crewMemberLineTwo.height = 60;
        crewMemberLineTwo.width = 60;

        shipGUIContainer.addChild(crewMemberLineTwo);
      }
    }
  }

  loadWeasponsGUIofShip(shipGUIContainer: Container, ship: Ship)
  {
    for (let i = 0; i < ship.maxWeaponsAllowed; i++) {
      let shipWeaponGUI = Sprite.from(`/assets/images/gui/box_weapons_${ i < ship.weapons.length ? 'on' : 'off'}.png`);
      shipWeaponGUI.x = 425 + (i * 120);
      shipWeaponGUI.y = 515;

      shipGUIContainer.addChild(shipWeaponGUI);
    }

    // TODO display weapons
  }

  loadDronesGUIofShip(shipGUIContainer: Container, ship: Ship)
  {
    if (ship.drones.length > 0)
    {
      for (let i = 0; i < ship.maxDronesAllowed; i++) {
        let shipDroneGUI = Sprite.from(`/assets/images/gui/box_drones_${ i < ship.drones.length ? 'on' : 'off'}.png`);
        shipDroneGUI.x = 425 + (i * 120);
        shipDroneGUI.y = 625;

        shipGUIContainer.addChild(shipDroneGUI);
      }

      // TODO display drones
    }
  }

  loadUpgradesGUIOfShip(shipGUIContainer: Container, ship: Ship)
  {
    for (let i = 0; i < ship.maxUpgradesAllowed; i++) {
      let shipDroneGUI = Sprite.from(`/assets/images/gui/box_augment_${ i < ship.upgrades.length ? 'on' : 'off'}.png`);
      shipDroneGUI.x = 990;
      shipDroneGUI.y = 529 + (i * 60);

      shipGUIContainer.addChild(shipDroneGUI);
    }

    if (ship.upgrades.length > 0)
    {
      // TODO display upgrades
    }
  }

  private loadShipDevGridGUI(shipFloorContainer: Container) {
    let shipDevGrid = new Graphics();

    for (let y = 0; y < MAX_SHIP_SLOT_Y; y++) {
      for (let x = 0; x < MAX_SHIP_SLOT_X; x++) {
        shipDevGrid
          .lineStyle(2, 0xffffff, .5)
          .drawRect(x * TILE_SIZE_WITH_BORDER, y * TILE_SIZE_WITH_BORDER, TILE_SIZE_WITH_BORDER - 2, TILE_SIZE_WITH_BORDER - 2);
      }
    }

    let textStyle = new TextStyle({
      align: 'center',
      fontFamily: 'Arial',
      fontSize: 16,
      fill: 0xffffff
    });

    // Tile position X
    for (let x = 0; x < MAX_SHIP_SLOT_X; x++) {
      let tileXCoordinate = new Text(x, textStyle);

      tileXCoordinate.x = (x + (x * TILE_SIZE_WITH_BORDER) + 2); // 2 px for text align
      tileXCoordinate.y = MAX_SHIP_SLOT_Y * TILE_SIZE_WITH_BORDER + 20; // 20 px for text align

      shipFloorContainer.addChild(tileXCoordinate);
    }

    // Tile position Y
    for (let y = 0; y < MAX_SHIP_SLOT_Y; y++) {
      let tileYCoordinate = new Text(y, textStyle);

      tileYCoordinate.x = -30; // -30 px for text align
      tileYCoordinate.y = (y + (y * TILE_SIZE_WITH_BORDER) + 8); // 8 px for text align

      shipFloorContainer.addChild(tileYCoordinate);
    }

    shipFloorContainer.addChild(shipDevGrid);
  }
}
