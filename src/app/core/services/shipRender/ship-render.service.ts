declare var PIXI: any;

import { Injectable } from '@angular/core';

import { TexturesManagerService } from '../texturesManager/textures-manager.service';

import { KestrelShip, Ship } from '../../models/ships/index';
import { DEFAULT_TILE_HEIGHT, DEFAULT_TILE_WIDTH, Room } from '../../models/room/index';
import { SystemPositionEnum, Teleport } from '../../models/systems/index';

@Injectable({
  providedIn: 'root'
})
export class ShipRenderService {

  constructor(private texturesManagerService: TexturesManagerService)
  {}

  startShipRender(shipContainer: any, shipFloorContainer: any, ship: Ship, isShedMode: boolean = false, shipGUIContainer: any = null)
  {
    this.loadThrustersAnimation(shipContainer, ship);

    if (isShedMode)
    {
      this.loadSystemsGUIofShip(shipGUIContainer, ship);
      this.loadCrewsGUIofShip(shipGUIContainer, ship);
      this.loadWeasponsGUIofShip(shipGUIContainer, ship);
      this.loadDronesGUIofShip(shipGUIContainer, ship);
      this.loadUpgradesGUIOfShip(shipGUIContainer, ship);
    }

    this.loadRoomsGUIofShip(shipFloorContainer, ship, isShedMode);
    this.loadDoorsGUIofShip(shipFloorContainer, ship);
  }

  loadThrustersAnimation(shipContainer: any, ship: Ship)
  {
    if (ship instanceof KestrelShip)
    {
      const thrustersOnSheet = PIXI.Loader.shared.resources["/assets/images/effects/thrusters_on.json"].spritesheet;
      const thrustersAnimationSpeed = .12;

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

      shipContainer.addChild(animatedThrustersLeftSprite, animatedThrustersRightSprite);
    }
  }

  loadRoomsGUIofShip(shipFloorContainer: any, ship: Ship, isShedMode: boolean)
  {
    for (let room of ship.rooms) {
      let roomTileBorder = new PIXI.Graphics()
        .beginFill(0x000000)
        .drawRect(room.roomDisplaySettings.x - 2, room.roomDisplaySettings.y - 2, room.roomDisplaySettings.width + 4, room.roomDisplaySettings.height + 4)
        .endFill();

      room.roomTile = new PIXI.Graphics()
        .beginFill(room.getBackgroundColorForOxygenLevel())
        .drawRect(room.roomDisplaySettings.x, room.roomDisplaySettings.y, room.roomDisplaySettings.width, room.roomDisplaySettings.height)
        .endFill();

      shipFloorContainer.addChild(roomTileBorder, room.roomTile);

      this.loadRoomGrid(shipFloorContainer, room);

      room.noOxygenInRoomSprite = new PIXI.Sprite.from(`/assets/images/effects/low_o2_stripes_${room.roomDisplaySettings.sizeX}x${room.roomDisplaySettings.sizeY}.png`);
      room.noOxygenInRoomSprite.x = room.roomDisplaySettings.x;
      room.noOxygenInRoomSprite.y = room.roomDisplaySettings.y;
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
                  let roomTeleportSystemInterior = new PIXI.Sprite.from(room.affectedSystem.srcSystemInRoomSprite);
                  roomTeleportSystemInterior.x = room.roomDisplaySettings.x + 4 + (i * DEFAULT_TILE_WIDTH); // 4px for center teleport sprite texture
                  roomTeleportSystemInterior.y = room.roomDisplaySettings.y + 4 + (y * DEFAULT_TILE_HEIGHT);
                  roomTeleportSystemInterior.alpha = room.affectedSystem.isInstalled ? 1 : .5;

                  shipFloorContainer.addChild(roomTeleportSystemInterior);
                }
              }
            }
            else
            {
              let roomSystemInterior = new PIXI.Sprite.from(room.affectedSystem.srcSystemInRoomSprite);
              roomSystemInterior.x = room.roomDisplaySettings.x - 2;
              roomSystemInterior.y = room.roomDisplaySettings.y - 2;
              roomSystemInterior.alpha = room.affectedSystem.isInstalled ? 1 : .5;

              shipFloorContainer.addChild(roomSystemInterior);
            }
          }

          let roomSystemIcon = new PIXI.Sprite.from(room.affectedSystem.srcSystemOverlaySprite);
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

                if (slot && slot.crew && slot.crew.id == room.affectedCrew.id)
                {
                  let crewMember = new PIXI.AnimatedSprite(this.texturesManagerService.getRaceSheetForRace(room.affectedCrew.getRaceNameWithGender().toLowerCase()).animations[crewMemberAnimationName]);
                  crewMember.x = room.roomDisplaySettings.x + (DEFAULT_TILE_WIDTH * slot.slotPositionX) + 16.5; // 16.5 = 33 / 2 for position crew in center of slot
                  crewMember.y = room.roomDisplaySettings.y + (DEFAULT_TILE_HEIGHT * slot.slotPositionY) + 16.5;
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

  loadRoomGrid(shipFloorContainer: any, room: Room)
  {
    if (room.roomDisplaySettings.sizeX > 1)
    {
      for (let verticalLineIndex = 1; verticalLineIndex < room.roomDisplaySettings.sizeX; verticalLineIndex++) {
        let roomTileSlotLine = new PIXI.Graphics()
          .beginFill(0xb4b1ac)
          .drawRect(room.roomDisplaySettings.x + (verticalLineIndex * DEFAULT_TILE_HEIGHT), room.roomDisplaySettings.y, 1, room.roomDisplaySettings.width)
          .endFill();

        shipFloorContainer.addChild(roomTileSlotLine);
      }
    }

    if (room.roomDisplaySettings.sizeY > 1)
    {
      for (let horizontalLineIndex = 1; horizontalLineIndex < room.roomDisplaySettings.sizeY; horizontalLineIndex++) {
        let roomTileSlotLine = new PIXI.Graphics()
          .beginFill(0xb4b1ac)
          .drawRect(room.roomDisplaySettings.x, room.roomDisplaySettings.y + (horizontalLineIndex * DEFAULT_TILE_WIDTH), room.roomDisplaySettings.height, 1)
          .endFill();

        shipFloorContainer.addChild(roomTileSlotLine);
      }
    }
  }

  loadDoorsGUIofShip(shipFloorContainer: any, ship: Ship)
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

      shipFloorContainer.addChild(doorSprite);
    }
  }

  //
  // Shed mode related - specific for shed view
  //

  loadSystemsGUIofShip(shipGUIContainer: any, ship: Ship)
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

        shipGUIContainer.addChild(shipSystemGUI, shipSystemIconGUI);

        for (let y = 0; y < room.affectedSystem!.level; y++) {
          let shipSystemLevel = new PIXI.Graphics()
          shipSystemLevel
            .beginFill(0x3ff33c)
            .drawRect(391.5 + (i * 38), 435 + (y * -7), 15, 5)
            .endFill();

          shipGUIContainer.addChild(shipSystemLevel);
        }
      }
    }
  }

  loadCrewsGUIofShip(shipGUIContainer: any, ship: Ship)
  {
    for (let i = 0; i < 2; i++) {
      let shipCrewLineOneGUI = PIXI.Sprite.from(`/assets/images/gui/box_crew_${ i < ship.crews.length ? 'on' : 'off'}.png`);
      shipCrewLineOneGUI.x = 60 + (i * 150);
      shipCrewLineOneGUI.y = 530;

      shipGUIContainer.addChild(shipCrewLineOneGUI);

      let crewMember = ship.crews[i];

      if (crewMember)
      {
        let raceName = crewMember.getRaceNameWithGender().toLowerCase();

        let crewMemberLineOne = PIXI.Sprite.from(this.texturesManagerService.getRaceSheetForRace(raceName).textures[`${raceName}_base-0.png`]);
        crewMemberLineOne.x = 112 + (i * 150);
        crewMemberLineOne.y = 558;
        crewMemberLineOne.height = 60;
        crewMemberLineOne.width = 60;

        shipGUIContainer.addChild(crewMemberLineOne);
      }
    }

    for (let y = 0; y < 2; y++) {
      let shipCrewLineTwoGUI = PIXI.Sprite.from(`/assets/images/gui/box_crew_${ y + 2 < ship.crews.length ? 'on' : 'off'}.png`);
      shipCrewLineTwoGUI.x = 60 + (y * 150);
      shipCrewLineTwoGUI.y = 620;

      shipGUIContainer.addChild(shipCrewLineTwoGUI);

      let crewMember = ship.crews[y + 2];

      if (crewMember)
      {
        let raceName = crewMember.getRaceNameWithGender().toLowerCase();

        let crewMemberLineTwo = PIXI.Sprite.from(this.texturesManagerService.getRaceSheetForRace(raceName).textures[`${raceName}_base-0.png`]);
        crewMemberLineTwo.x = 112 + (y * 150);
        crewMemberLineTwo.y = 648;
        crewMemberLineTwo.height = 60;
        crewMemberLineTwo.width = 60;

        shipGUIContainer.addChild(crewMemberLineTwo);
      }
    }
  }

  loadWeasponsGUIofShip(shipGUIContainer: any, ship: Ship)
  {
    for (let i = 0; i < ship.maxWeaponsAllowed; i++) {
      let shipWeaponGUI = PIXI.Sprite.from(`/assets/images/gui/box_weapons_${ i < ship.weapons.length ? 'on' : 'off'}.png`);
      shipWeaponGUI.x = 425 + (i * 120);
      shipWeaponGUI.y = 515;

      shipGUIContainer.addChild(shipWeaponGUI);
    }

    // TODO display weapons
  }

  loadDronesGUIofShip(shipGUIContainer: any, ship: Ship)
  {
    if (ship.drones.length > 0)
    {
      for (let i = 0; i < ship.maxDronesAllowed; i++) {
        let shipDroneGUI = PIXI.Sprite.from(`/assets/images/gui/box_drones_${ i < ship.drones.length ? 'on' : 'off'}.png`);
        shipDroneGUI.x = 425 + (i * 120);
        shipDroneGUI.y = 625;

        shipGUIContainer.addChild(shipDroneGUI);
      }

      // TODO display drones
    }
  }

  loadUpgradesGUIOfShip(shipGUIContainer: any, ship: Ship)
  {
    for (let i = 0; i < ship.maxUpgradesAllowed; i++) {
      let shipDroneGUI = PIXI.Sprite.from(`/assets/images/gui/box_augment_${ i < ship.upgrades.length ? 'on' : 'off'}.png`);
      shipDroneGUI.x = 990;
      shipDroneGUI.y = 529 + (i * 60);

      shipGUIContainer.addChild(shipDroneGUI);
    }

    if (ship.upgrades.length > 0)
    {
      // TODO display upgrades
    }
  }
}
