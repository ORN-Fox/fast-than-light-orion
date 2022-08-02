import { CrewsService } from '../../../services/crews/crews.service';

import { KestrelShip } from './kestrelShip.model';

import { Crew, Gender } from '../../crew/crew.model';
import { Human, Mantis, Zoltan } from '../../races/index';

import { Room, RoomDisplaySettings } from '../../room/index';
import { Battery, Cloacking, DoorControl, DroneControl, Engine, Hacking, Medbay, MindControl, Oxygen, Piloting, Sensor, Shield, SystemPositionEnum, Teleport, WeaponControl } from '../../systems/index';
import { Slot } from '../../slot/slot.model';

import { BasicLaser } from '../../weapons/armory/lasers/basicLaser.model';

export class KestrelLayoutB extends KestrelShip {

  constructor(crewsService: CrewsService) {
    super();

    this.name = this.originalName = 'Red-Tail';
    this.layout = 'B';

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

    let shieldRoom = new Room(new RoomDisplaySettings(128, 122, 2, 2), new Shield(2, SystemPositionEnum.Top, 9), this.crews[2]), // Mantis
      enginesRoom = new Room(new RoomDisplaySettings(94, 192,  2, 1), new Engine(2, SystemPositionEnum.Right, 3), this.crews[1]), // Human Female
      oxygenRoom = new Room(new RoomDisplaySettings(302, 123, 2, 2), new Oxygen(1, 11)),
      weaponsControlRoom = new Room(new RoomDisplaySettings(128, 229, 2, 2), new WeaponControl(4), this.crews[3]), // Zoltan
      medbayRoom = new Room(new RoomDisplaySettings(198, 87, 2, 2), new Medbay(1, 4)),
      pilotingRoom = new Room(new RoomDisplaySettings(512, 192,  2, 1), new Piloting(1, SystemPositionEnum.Right, 3), this.crews[0]), // Human Male
      sensorRoom = new Room(new RoomDisplaySettings(232, 229, 2, 1), new Sensor(1, SystemPositionEnum.Bottom, 2)),
      doorControlRoom = new Room(new RoomDisplaySettings(372, 192, 2, 1), new DoorControl()),
      mindControlRoom = new Room(new RoomDisplaySettings(268, 87, 2, 1), new MindControl(1, 1, false)),
      teleportRoom = new Room(new RoomDisplaySettings(232, 156, 2, 1), new Teleport(1, false)),
      batteryRoom = new Room(new RoomDisplaySettings(302, 192, 2, 1), new Battery(1, 2, false)),
      dronesControlRoom = new Room(new RoomDisplaySettings(198, 266, 2, 2), new DroneControl(1, 12, false)),
      cloackingRoom = new Room(new RoomDisplaySettings(302, 229, 2, 2), new Cloacking(1, 2, false)),
      hackingRoom = new Room(new RoomDisplaySettings(268, 299, 2, 1), new Hacking(1, 4, false)),
      rightOfDoorControlRoom = new Room(new RoomDisplaySettings(442, 192, 2, 1)); // right of door control

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
    this.interiorSpriteX = 375;
    this.interiorSpriteY = 57;

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
