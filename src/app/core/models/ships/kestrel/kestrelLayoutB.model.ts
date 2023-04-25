import { CrewsService } from '../../../services/crews/crews.service';

import { ShipLayoutEnum } from '../ship.model';
import { KestrelShip } from './kestrelShip.model';

import { Crew, Gender } from '../../crew/crew.model';
import { Human, Mantis, Zoltan } from '../../races/index';

import { Room, RoomDisplaySettings } from '../../room/index';
import { Battery, Cloacking, DoorControl, DroneControl, Engine, Hacking, Medbay, MindControl, Oxygen, Piloting, Sensor, Shield, SystemPositionEnum, Teleport, WeaponControl } from '../../systems/index';
import { Slot } from '../../slot/slot.model';

import { BasicLaser } from '../../weapons/armory/lasers/basicLaser.model';
import { Door } from '../../door/door.model';

export class KestrelLayoutB extends KestrelShip {

  constructor(crewsService: CrewsService) {
    super();

    this.name = this.originalName = 'Red-Tail';
    this.layout = ShipLayoutEnum.B;

    this.hull = this.maxHull = 300;
    this.reactorPower = 8;
    this.fuel = 16;
    this.missiles = 5;
    this.droneParts = 0;

    this.crews = [
      crewsService.createCrew(new Human(), Gender.Male),
      crewsService.createCrew(new Human(), Gender.Female),
      crewsService.createCrew(new Mantis(), Gender.Other),
      crewsService.createCrew(new Zoltan(), Gender.Other)
    ];

    let shieldRoom = new Room(new RoomDisplaySettings(4, 3, 2, 2), new Shield(2, SystemPositionEnum.Top, 9), this.crews[2]), // Mantis
      enginesRoom = new Room(new RoomDisplaySettings(3, 5,  2, 1), new Engine(2, SystemPositionEnum.Right, 3), this.crews[1]), // Human Female
      oxygenRoom = new Room(new RoomDisplaySettings(9, 3, 2, 2), new Oxygen(1, 11)),
      weaponsControlRoom = new Room(new RoomDisplaySettings(4, 6, 2, 2), new WeaponControl(4), this.crews[3]), // Zoltan
      medbayRoom = new Room(new RoomDisplaySettings(6, 2, 2, 2), new Medbay(1, 4)),
      pilotingRoom = new Room(new RoomDisplaySettings(15, 5,  2, 1), new Piloting(1, SystemPositionEnum.Right, 3), this.crews[0]), // Human Male
      sensorRoom = new Room(new RoomDisplaySettings(7, 6, 2, 1), new Sensor(1, SystemPositionEnum.Bottom, 2)),
      doorControlRoom = new Room(new RoomDisplaySettings(11, 5, 2, 1), new DoorControl()),
      mindControlRoom = new Room(new RoomDisplaySettings(8, 2, 2, 1), new MindControl(1, 1, false)),
      teleportRoom = new Room(new RoomDisplaySettings(7, 4, 2, 1), new Teleport(1, false)),
      batteryRoom = new Room(new RoomDisplaySettings(9, 5, 2, 1), new Battery(1, 2, false)),
      dronesControlRoom = new Room(new RoomDisplaySettings(6, 7, 2, 2), new DroneControl(1, 12, false)),
      cloackingRoom = new Room(new RoomDisplaySettings(9, 6, 2, 2), new Cloacking(1, 2, false)),
      hackingRoom = new Room(new RoomDisplaySettings(8, 8, 2, 1), new Hacking(1, 4, false)),
      rightOfDoorControlRoom = new Room(new RoomDisplaySettings(13, 5, 2, 1)); // right of door control

    this.rooms = [
      shieldRoom,
      enginesRoom,
      oxygenRoom,
      weaponsControlRoom,
      medbayRoom,
      pilotingRoom,
      sensorRoom,
      doorControlRoom,
      mindControlRoom,
      teleportRoom,
      batteryRoom,
      dronesControlRoom,
      cloackingRoom,
      hackingRoom,
      rightOfDoorControlRoom
    ];

    this.doors = [
      new Door(5, 4.5, 90), // Top of engine room
      new Door(5, 5.5, 90), // Botton of engine room
      new Door(5.5, 3), // Right of shield room
      new Door(7.5, 2), // Right of medbay room
      new Door(8, 3.5, 90), // Bottom of medbay room
      new Door(9, 1.5, 90), // Top left of mind control room
      new Door(10, 1.5, 90), // Top right of mind control room
      new Door(10, 2.5, 90), // Bottom of mind control room
      new Door(8.5, 4), // Right of teleport room
      new Door(5.5, 7), // Right of weapon room
      new Door(8, 6.5, 90), // Top of drone control room
      new Door(7.5, 8), // Right of drone control room
      new Door(8.5, 6), // Right of sensor room
      new Door(9, 8.5, 90), // Bottom left of hacking room
      new Door(10, 8.5, 90), // Bottom right of hacking room
      new Door(10, 4.5, 90), // Bottom left of oxygen room
      new Door(11, 4.5, 90), // Bottom right of oxygen room
      new Door(10, 7.5, 90), // Bottom of cloacking room
      new Door(10, 5.5, 90), // Top left of cloacking room
      new Door(11, 5.5, 90), // Top right of cloacking room
      new Door(10.5, 5), // Right of battery room
      new Door(12.5, 5), // Right of door control
      new Door(14, 4.5, 90), // Top left of right of door control
      new Door(15, 4.5, 90), // Top right of right of door control
      new Door(14, 5.5, 90), // Bottom left of right of door control
      new Door(15, 5.5, 90), // Bottom right of right of door control,
      new Door(14.5, 5) // Right of piloting room
    ];

    this.weapons = [
      new BasicLaser(),
      new BasicLaser(),
      new BasicLaser(),
      new BasicLaser()
    ];

    // Capacities related
    this.maxWeaponsAllowed = 4;
    this.maxDronesAllowed = 2;
    this.maxCrewsAllowed = 6;
    this.maxUpgradesAllowed = 3;

    // Display related
    this.srcHullSprite = '/assets/images/ships/kestrel/layout_b/kestral_b_base.png';
    this.srcInteriorSprite = '/assets/images/ships/kestrel/layout_b/kestral_b_floor.png';

    // Shed display related
    this.hullSpriteX = 300;
    this.hullSpriteY = 0;
    this.interiorSpriteX = 388;
    this.interiorSpriteY = 41;

    this.shipRepresentation = [
      [null, null, null, new Slot(0, 0, medbayRoom), new Slot(0, 0, mindControlRoom), new Slot(0, 1, mindControlRoom), null, null, null, null, null, null, null], // y0
      [null, new Slot(0, 0, shieldRoom), new Slot(1, 0, shieldRoom, shieldRoom.affectedCrew), new Slot(0, 1, medbayRoom), new Slot(1, 1, medbayRoom), null, new Slot(0, 0, oxygenRoom), new Slot(1, 0, oxygenRoom), null, null, null, null, null, null], // y1
      [null, new Slot(0, 1, shieldRoom), new Slot(1, 1, shieldRoom), null, new Slot(0, 0, teleportRoom), new Slot(1, 0, teleportRoom), new Slot(0, 1, oxygenRoom), new Slot(1, 1, oxygenRoom), null, null, null, null, null, null], // y2
      [new Slot(0, 0, enginesRoom), new Slot(1, 0, enginesRoom, enginesRoom.affectedCrew), null, null, null, null, new Slot(0, 0, batteryRoom), new Slot(1, 0, batteryRoom), new Slot(0, 0, doorControlRoom), new Slot(1, 0, doorControlRoom), new Slot(0, 0, rightOfDoorControlRoom), new Slot(1, 0, rightOfDoorControlRoom), new Slot(0, 0, pilotingRoom), new Slot(1, 0, pilotingRoom, pilotingRoom.affectedCrew)], // y3
      [null, new Slot(0, 0, weaponsControlRoom), new Slot(1, 0, weaponsControlRoom, weaponsControlRoom.affectedCrew), null, new Slot(0, 0, sensorRoom), new Slot(1, 0, sensorRoom), new Slot(0, 0, cloackingRoom), new Slot(1, 0, cloackingRoom), null, null, null, null, null, null], // y4
      [null, new Slot(0, 1, weaponsControlRoom), new Slot(1, 1, weaponsControlRoom), new Slot(0, 0, dronesControlRoom), new Slot(1, 0, dronesControlRoom), null, new Slot(0, 1, cloackingRoom), new Slot(1, 1, cloackingRoom), , null, null, null, null, null, null], // y5
      [null, null, null, new Slot(0, 1, dronesControlRoom), new Slot(1, 1, dronesControlRoom), new Slot(0, 0, hackingRoom), new Slot(1, 0, hackingRoom), null, null, null, null, null, null, null], // y6
    ];
  }
}
