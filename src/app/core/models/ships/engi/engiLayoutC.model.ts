import { CrewsService } from '../../../services/crews/crews.service';

import { ShipLayoutEnum } from '../ship.model';
import { EngiShip } from './engiShip.model';

import { Crew, Gender } from '../../crew/crew.model';
import { Engi, Lanius } from '../../races/index';

import { Door } from '../../door/door.model';
import { Room, RoomDisplaySettings } from '../../room/index';
import { Slot } from '../../slot/slot.model';
import { Battery, Cloacking, CloneBay, DoorControl, DroneControl, Engine, Hacking, MindControl, Oxygen, Piloting, Sensor, Shield, SystemPositionEnum, Teleport, WeaponControl } from '../../systems/index';

import { BeamI } from '../../drones/index';
import { DefenseScrambler } from '../../upgrades/index';
import { DualLasers } from '../../weapons/armory/lasers/dualLasers.model';

export class EngiLayoutC extends EngiShip {

  constructor(crewsService: CrewsService) {
    super();

    this.name = this.originalName = 'Tetragon';
    this.layout = ShipLayoutEnum.C;

    this.hull = this.maxHull = 300;
    this.reactorPower = 9;
    this.fuel = 16;
    this.missiles = 0;
    this.droneParts = 25;

    this.crews = [
      crewsService.createCrew(new Lanius(), Gender.Other),
      crewsService.createCrew(new Engi(), Gender.Other),
      crewsService.createCrew(new Engi(), Gender.Male)
    ];

    let shieldRoom = new Room(new RoomDisplaySettings(9, 6, 2, 2), new Shield(2, SystemPositionEnum.Left, 4)),
      engineRoom = new Room(new RoomDisplaySettings(5, 7, 1, 2), new Engine(2, SystemPositionEnum.Bottom, 2), this.crews[2]), // Lanius
      oxygenRoom = new Room(new RoomDisplaySettings(5, 3, 1, 2), new Oxygen(1, 13)),
      weaponsControlRoom = new Room(new RoomDisplaySettings(11, 4, 2, 2), new WeaponControl(), this.crews[1]), // Engi
      droneControlRoom = new Room(new RoomDisplaySettings(6, 5, 2, 2), new DroneControl(2, 9)),
      pilotingRoom = new Room(new RoomDisplaySettings(13, 8, 1, 2), new Piloting(1, SystemPositionEnum.Right), this.crews[0]), // Engi
      sensorRoom = new Room(new RoomDisplaySettings(8, 8, 2, 1), new Sensor(1, SystemPositionEnum.Top, 2)),
      doorControlRoom = new Room(new RoomDisplaySettings(11, 9, 2, 1), new DoorControl()),
      cloneBayRoom = new Room(new RoomDisplaySettings(7, 7, 2, 1), new CloneBay(1)),
      hackingRoom = new Room(new RoomDisplaySettings(10, 3, 1, 2), new Hacking(1, 5)),
      cloackingRoom = new Room(new RoomDisplaySettings(6, 3, 1, 2), new Cloacking(1, 4, false)),
      batteryRoom = new Room(new RoomDisplaySettings(7, 3, 1, 2), new Battery(1, 17, false)),
      mindControlRoom = new Room(new RoomDisplaySettings(8, 3, 1, 2), new MindControl(1, 12, false)),
      teleportRoom = new Room(new RoomDisplaySettings(9, 3, 1, 2), new Teleport(1, false)),
      bottomOfWeaponsControlRoom = new Room(new RoomDisplaySettings(11, 6, 1, 2)),
      rightOfEngineRoom = new Room(new RoomDisplaySettings(6, 8, 2, 1)),
      bottomOfSensorRoom = new Room(new RoomDisplaySettings(9, 9, 2, 1));

    this.rooms = [
      shieldRoom,
      engineRoom,
      oxygenRoom,
      weaponsControlRoom,
      droneControlRoom,
      pilotingRoom,
      sensorRoom,
      doorControlRoom,
      cloneBayRoom,
      hackingRoom,
      cloackingRoom,
      batteryRoom,
      mindControlRoom,
      teleportRoom,
      bottomOfWeaponsControlRoom,
      rightOfEngineRoom,
      bottomOfSensorRoom
    ];

    this.doors = [
      new Door(5.5, 8), // Right of engine room
      new Door(5.5, 4), // Right of oxygen room
      new Door(6.5, 4), // Right of cloacking room
      new Door(7.5, 4), // Right of battery room
      new Door(8, 2.5, 90), // Top of battery room
      new Door(8.5, 4), // Right of mind control room
      new Door(9, 2.5, 90), // Top of mind control room
      new Door(9.5, 4), // Right of teleport room
      new Door(10, 2.5, 90), // Top of teleport room
      new Door(10.5, 4), // Right of hacking room
      new Door(12, 5.5, 90), // Bottom of weapon room
      new Door(7, 4.5, 90), // Top left of drone control room
      new Door(8, 4.5, 90), // Top right of drone control room
      new Door(7.5, 6), // Right of drone control room
      new Door(8, 6.5, 90), // Bottom of drone control room
      new Door(8, 7.5, 90), // Bottom of clonebay room
      new Door(8.5, 7), // Right of clonebay room
      new Door(7.5, 8), // Left of sensor room
      new Door(10, 8.5, 90), // Bottom of sensor room
      new Door(10.5, 7), // Right of shield room
      new Door(11, 9.5, 90), // Bottom of room on bottom of sensor room
      new Door(10.5, 9), // Left of door control room
      new Door(12.5, 9), // Left of piloting room
    ];

    this.weapons = [
      new DualLasers() // Dual Lasers
    ];

    this.drones = [
      new BeamI()
    ];

    this.upgrades = [
      new DefenseScrambler()
    ];

    // Capacities related
    this.maxWeaponsAllowed = 3;
    this.maxDronesAllowed = 3;
    this.maxCrewsAllowed = 6;
    this.maxUpgradesAllowed = 3;

    // Display related
    this.srcHullSprite = '/assets/images/ships/engi/layout_c/circle_cruiser_c_base.png';
    this.srcInteriorSprite = '/assets/images/ships/engi/layout_c/circle_cruiser_c_floor.png';

    // Shed display related
    this.hullSpriteX = 400;
    this.hullSpriteY = 65;
    this.interiorSpriteX = 465;
    this.interiorSpriteY = 100;

    // Experimental
    this.shipRepresentation = [
      [new Slot(0, 0, oxygenRoom), new Slot(0, 0, cloackingRoom), new Slot(0, 0, batteryRoom), new Slot(0, 0, mindControlRoom), new Slot(0, 0, teleportRoom), new Slot(0, 0, hackingRoom), null, null, null], // y0
      [new Slot(0, 1, oxygenRoom), new Slot(0, 1, cloackingRoom), new Slot(0, 1, batteryRoom), new Slot(0, 1, mindControlRoom), new Slot(0, 1, teleportRoom), new Slot(0, 1, hackingRoom), new Slot(0, 0, weaponsControlRoom), new Slot(1, 0, weaponsControlRoom, weaponsControlRoom.affectedCrew), null], // y1
      [null, new Slot(0, 0, droneControlRoom), new Slot(1, 0, droneControlRoom), null, null, null, null, new Slot(0, 1, weaponsControlRoom), new Slot(1, 1, weaponsControlRoom), null], // y2
      [null, new Slot(0, 1, droneControlRoom), new Slot(1, 1, droneControlRoom), null, new Slot(0, 0, shieldRoom), new Slot(1, 0, shieldRoom), new Slot(0, 0, bottomOfWeaponsControlRoom), null, null], // y3
      [new Slot(0, 0, engineRoom), null, new Slot(0, 0, cloneBayRoom), new Slot(1, 0, cloneBayRoom), new Slot(0, 1, shieldRoom), new Slot(1, 1, shieldRoom), new Slot(0, 1, bottomOfWeaponsControlRoom), null, null], // y4
      [new Slot(0, 1, engineRoom, engineRoom.affectedCrew), new Slot(0, 0, rightOfEngineRoom), new Slot(1, 0, rightOfEngineRoom), new Slot(0, 0, sensorRoom), new Slot(1, 0, sensorRoom), null, null, null, new Slot(0, 0, pilotingRoom, pilotingRoom.affectedCrew)], // y5
      [null, null, null, null, new Slot(0, 0, bottomOfSensorRoom), new Slot(1, 0, bottomOfSensorRoom), new Slot(0, 0, doorControlRoom), new Slot(1, 0, doorControlRoom), new Slot(0, 1, pilotingRoom)] // y6
    ];
  }
}
