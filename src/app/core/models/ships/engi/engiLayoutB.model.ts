import { CrewsService } from '../../../services/crews/crews.service';

import { ShipLayoutEnum } from '../ship.model';
import { EngiShip } from './engiShip.model';

import { Crew, Gender } from '../../crew/crew.model';
import { Engi } from '../../races/engi/engi.model';

import { Door } from '../../door/door.model';
import { Room, RoomDisplaySettings } from '../../room/index';
import { Slot } from '../../slot/slot.model';
import { Battery, Cloacking, DoorControl, DroneControl, Engine, Hacking, Medbay, MindControl, Oxygen, Piloting, Sensor, Shield, SystemPositionEnum, Teleport, WeaponControl } from '../../systems/index';

import { AntiPersonnel, SystemRepair } from '../../drones/index';
import { DroneReactorBooster } from '../../upgrades/index';
import { HeavyIon, HeavyLaserI } from '../../weapons/index';

export class EngiLayoutB extends EngiShip {

  constructor(crewsService: CrewsService) {
    super();

    this.name = this.originalName = 'The Vortex';
    this.layout = ShipLayoutEnum.B;

    this.hull = this.maxHull = 300;
    this.reactorPower = 9;
    this.fuel = 16;
    this.missiles = 0;
    this.droneParts = 6;

    this.crews = [
      crewsService.createCrew(new Engi(), Gender.Other)
    ];

    let shieldRoom = new Room(new RoomDisplaySettings(9, 8, 2, 1), new Shield(2, SystemPositionEnum.Bottom, 11)),
      engineRoom = new Room(new RoomDisplaySettings(5, 3, 2, 2), new Engine(1, SystemPositionEnum.Bottom, 2)),
      oxygenRoom = new Room(new RoomDisplaySettings(6, 5, 1, 2), new Oxygen(1, 6)),
      weaponControlRoom = new Room(new RoomDisplaySettings(7, 4, 2, 1), new WeaponControl(3, SystemPositionEnum.Top, 11)),
      droneControlRoom = new Room(new RoomDisplaySettings(5, 7, 2, 2), new DroneControl(3, 4)),
      medbayRoom = new Room(new RoomDisplaySettings(11, 6, 1, 2), new Medbay(1, 6)),
      pilotingRoom = new Room(new RoomDisplaySettings(13, 8, 1, 2), new Piloting(1, SystemPositionEnum.Right), this.crews[0]), // Engi
      doorControlRoom = new Room(new RoomDisplaySettings(7, 7, 2, 1), new DoorControl()),
      mindControlRoom = new Room(new RoomDisplaySettings(5, 5, 1, 2), new MindControl(1, 4, false)),
      sensorRoom = new Room(new RoomDisplaySettings(9, 4, 2, 1), new Sensor(1, SystemPositionEnum.Bottom, 2, false)),
      teleprtRoom = new Room(new RoomDisplaySettings(11, 4, 1, 2), new Teleport(1, false)),
      hackingRoom = new Room(new RoomDisplaySettings(9, 7, 2, 1), new Hacking(1, 4, false)),
      batteryRoom = new Room(new RoomDisplaySettings(7, 8, 2, 1), new Battery(1, 7, false)),
      cloackingRoom = new Room(new RoomDisplaySettings(11, 8, 2, 1), new Cloacking(1, 7, false)),
      topOfWeaponControlRoom = new Room(new RoomDisplaySettings(8, 3, 2, 1));

    this.rooms = [
      shieldRoom,
      engineRoom,
      oxygenRoom,
      weaponControlRoom,
      droneControlRoom,
      medbayRoom,
      pilotingRoom,
      doorControlRoom,
      mindControlRoom,
      sensorRoom,
      teleprtRoom,
      hackingRoom,
      batteryRoom,
      cloackingRoom,
      topOfWeaponControlRoom
    ];

    this.doors = [
      new Door(7, 4.5, 90), // Bottom of engine room
      new Door(6.5, 4), // Right of engine room
      new Door(4.5, 5), // Left top of mind control room
      new Door(4.5, 6), // Left bottom of mind control room
      new Door(5.5, 5), // Left top of oxygen room
      new Door(5.5, 6), // Left bottom of oxygen room
      new Door(7, 6.5, 90), // Top of drone control room
      new Door(6.5, 7), // Left of drone control room
      new Door(8, 7.5, 90), // Bottom left of door control room
      new Door(9, 7.5, 90), // Bottom right of door control room
      new Door(8.5, 7), // Right of door control room
      new Door(8, 8.5, 90), // Bottom left of battery room
      new Door(9, 8.5, 90), // Bottom right of battery room
      new Door(9, 3.5, 90), // Top right of weapon room
      new Door(8.5, 4), // Right of weapon room
      new Door(9, 2.5, 90), // Top left of room on top of weapon room
      new Door(10, 2.5, 90), // Top right of room on top of weapon room
      new Door(10.5, 4), // Right of sensor room
      new Door(10, 7.5, 90), // Botton left of battery room
      new Door(11, 7.5, 90), // Botton right of battery room
      new Door(10.5, 7), // Right of battery room
      new Door(12, 5.5, 90), // Bottom of teleport room
      new Door(12, 7.5, 90), // Bottom of medbay room
      new Door(12.5, 8) // Right of cloacking room
    ];

    this.weapons = [
      new HeavyIon(),
      new HeavyLaserI()
    ];

    this.drones = [
      new AntiPersonnel(),
      new SystemRepair(),
      new SystemRepair()
    ];

    this.upgrades = [
      new DroneReactorBooster()
    ];

    // Capacities related
    this.maxWeaponsAllowed = 3;
    this.maxDronesAllowed = 3;
    this.maxCrewsAllowed = 6;
    this.maxUpgradesAllowed = 3;

    // Display related
    this.srcHullSprite = '/assets/images/ships/engi/layout_b/circle_cruiser_b_base.png';
    this.srcInteriorSprite = '/assets/images/ships/engi/layout_b/circle_cruiser_b_floor.png';

    // Shed display related
    this.hullSpriteX = 400;
    this.hullSpriteY = 50;
    this.interiorSpriteX = 448;
    this.interiorSpriteY = 79;

    // Experimental
    this.shipRepresentation = [
      [new Slot(0, 0, engineRoom), new Slot(1, 0, engineRoom), null, new Slot(0, 0, topOfWeaponControlRoom), new Slot(1, 0, topOfWeaponControlRoom), null, null, null, null], // y0
      [new Slot(0, 1, engineRoom), new Slot(1, 1, engineRoom), new Slot(0, 0, weaponControlRoom), new Slot(1, 0, weaponControlRoom), new Slot(0, 0, sensorRoom), new Slot(1, 0, sensorRoom), new Slot(0, 0, teleprtRoom), null, null], // y1
      [new Slot(0, 0, mindControlRoom), new Slot(0, 0, oxygenRoom), null, null, null, null, new Slot(0, 1, teleprtRoom), null,  null], // y2
      [new Slot(1, 0, mindControlRoom), new Slot(1, 0, oxygenRoom), null, null, null, null, new Slot(0, 0, medbayRoom), null, null], // y3
      [new Slot(0, 0, droneControlRoom), new Slot(1, 0, droneControlRoom), new Slot(0, 0, doorControlRoom), new Slot(1, 0, doorControlRoom), new Slot(0, 0, hackingRoom), new Slot(1, 0, hackingRoom), new Slot(0, 1, medbayRoom), null, null], // y4
      [new Slot(0, 1, droneControlRoom), new Slot(1, 1, droneControlRoom), new Slot(0, 0, batteryRoom), new Slot(1, 0, batteryRoom), new Slot(0, 0, shieldRoom), new Slot(1, 0, shieldRoom), new Slot(0, 0, cloackingRoom), new Slot(1, 0, cloackingRoom), new Slot(0, 0, pilotingRoom, pilotingRoom.affectedCrew)], // y5
      [null, null, null, null, null, null, null, null, new Slot(0, 1, pilotingRoom)] // y6
    ];
  }
}
