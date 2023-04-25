import { CrewsService } from '../../../services/crews/crews.service';

import { ShipLayoutEnum } from '../ship.model';
import { KestrelShip } from './kestrelShip.model';

import { Gender } from '../../crew/crew.model';
import { Human } from '../../races/human/human.model';

import { Door } from '../../door/door.model';
import { Room, RoomDisplaySettings } from '../../room/index';
import { Battery, Cloacking, DroneControl, DoorControl, Engine, Hacking, Medbay, MindControl, Oxygen, Piloting, Sensor, Shield, SystemPositionEnum, Teleport, WeaponControl } from '../../systems/index';
import { Slot } from '../../slot/slot.model';

import { Artemis, BurstLaserII } from '../../weapons/index';

export class KestrelLayoutA extends KestrelShip {

  constructor(crewsService: CrewsService) {
    super();

    this.name = this.originalName = 'The Kestrel';
    this.layout = ShipLayoutEnum.A;

    this.hull = this.maxHull = 300;
    this.reactorPower = 8;
    this.fuel = 16;
    this.missiles = 8;
    this.droneParts = 2;

    this.crews = [
      crewsService.createCrew(new Human(), Gender.Male),
      crewsService.createCrew(new Human(), Gender.Female),
      crewsService.createCrew(new Human(), Gender.Female)
    ];

    let shieldRoom = new Room(new RoomDisplaySettings(10, 6, 2, 2), new Shield(2, SystemPositionEnum.Left)),
      enginesRoom = new Room(new RoomDisplaySettings(3, 5, 2, 2), new Engine(2, SystemPositionEnum.Bottom), this.crews[1]), // Human Female
      oxygenRoom = new Room(new RoomDisplaySettings(3, 4, 2, 1), new Oxygen()),
      weaponsControlRoom = new Room(new RoomDisplaySettings(6, 5, 2, 2), new WeaponControl(3), this.crews[2]), // Human Female
      medbayRoom = new Room(new RoomDisplaySettings(10, 4, 2, 2), new Medbay()),
      pilotingRoom = new Room(new RoomDisplaySettings(16, 5, 1, 2), new Piloting(1, SystemPositionEnum.Right), this.crews[0]), // Human Male
      sensorRoom = new Room(new RoomDisplaySettings(12, 6, 2, 1), new Sensor(1, SystemPositionEnum.Bottom)),
      doorControlRoom = new Room(new RoomDisplaySettings(12, 5, 2, 1), new DoorControl()),
      teleportRoom = new Room(new RoomDisplaySettings(3, 7, 2, 1), new Teleport(1, false)), // Botton on engine
      hackingRoom = new Room(new RoomDisplaySettings(5, 7, 2, 1), new Hacking(1, 0, false)), // Bottom of weapons
      batteryRoom = new Room(new RoomDisplaySettings(5, 4, 2, 1), new Battery(1, 0, false)), // Right on oxygen
      leftOnEngineRoom = new Room(new RoomDisplaySettings(2, 5, 1, 2)), // Left on engine
      topExternalDoorsRoom = new Room(new RoomDisplaySettings(8, 3, 2, 1)), // Top external doors on center of ship
      mindControlRoom = new Room(new RoomDisplaySettings(8, 4, 2, 2), new MindControl(1, 0, false)), // Bottom of top external doors
      cloackingRoom = new Room(new RoomDisplaySettings(8, 6, 2, 2), new Cloacking(1, 0, false)), // Top of bottom external doors
      bottomExternalDoorsRoom = new Room(new RoomDisplaySettings(8, 8, 2, 1)), // Bottom external doors on center of ship
      dronesControlRoom = new Room(new RoomDisplaySettings(14, 5, 2, 2), new DroneControl(1, 0, false)); // Left of piloting

    this.rooms = [
      shieldRoom,
      enginesRoom,
      oxygenRoom,
      weaponsControlRoom,
      medbayRoom,
      pilotingRoom,
      sensorRoom,
      doorControlRoom,
      teleportRoom,
      hackingRoom,
      batteryRoom,
      leftOnEngineRoom,
      topExternalDoorsRoom,
      mindControlRoom,
      cloackingRoom,
      bottomExternalDoorsRoom,
      dronesControlRoom
    ];

    this.doors = [
      new Door(1.5, 5), // Left Top of left external doors room
      new Door(1.5, 6), // left Bottom of left external doors room
      new Door(2.5, 5), // Left Top of engines room
      new Door(2.5, 6), // Left Bottom of engines room
      new Door(5, 4.5, 90), // Top of engines room
      new Door(4.5, 4), // Right of oxygen room
      new Door(4.5, 7), // Right of teleport room
      new Door(7, 4.5, 90), // Bottom Right of battery room
      new Door(7, 6.5, 90), // Top Right of hacking room
      new Door(7.5, 5), // Right Top of weapons room
      new Door(7.5, 6), // Right Bottom of weapons room
      new Door(9, 2.5, 90), // Top Left of top of mind room
      new Door(10, 2.5, 90), // Top Right of top of mind room
      new Door(9, 3.5, 90), // Top Left of mind room
      new Door(10, 3.5, 90), // Top Right of mind room
      new Door(9.5, 4), // Right Top of mind room
      new Door(9.5, 7), // Right Bottom of cloacking room
      new Door(10, 7.5, 90), // Bottom Left of cloacking room
      new Door(9, 7.5, 90), // Bottom Right of cloacking room
      new Door(9, 8.5, 90), // Top Left of bottom of cloacking room
      new Door(10, 8.5, 90), // Top Right of bottom of cloacking room
      new Door(11.5, 5), // Right Bottom of medbay room
      new Door(11.5, 6), // Right Top of shields room
      new Door(13.5, 5), // Right of doors room
      new Door(13.5, 6), // Right of sensors room
      new Door(15.5, 6) // Right Bottom of drones room
    ];

    this.weapons = [
      new BurstLaserII(),
      new Artemis()
    ];

    // Capacities related
    this.maxWeaponsAllowed = 4;
    this.maxDronesAllowed = 2;
    this.maxCrewsAllowed = 6;
    this.maxUpgradesAllowed = 3;

    // Display related
    this.srcHullSprite = '/assets/images/ships/kestrel/layout_a/kestral_a_base.png';
    this.srcInteriorSprite = '/assets/images/ships/kestrel/layout_a/kestral_a_floor.png';

    // Shed display related
    this.hullSpriteX = 312.5;
    this.hullSpriteY = 0;
    this.interiorSpriteX = 363;
    this.interiorSpriteY = 98;

    // Experimental
    this.shipRepresentation = [
      [null, null, null, null, null, null, new Slot(0, 0, topExternalDoorsRoom), new Slot(1, 0, topExternalDoorsRoom), null, null, null, null, null, null, null], // y0
      [null, new Slot(0, 0, oxygenRoom), new Slot(1, 0, oxygenRoom), new Slot(0, 0, batteryRoom), new Slot(1, 0, batteryRoom), null, new Slot(0, 0, mindControlRoom), new Slot(1, 0, mindControlRoom), new Slot(0, 0, medbayRoom), null, null, null, null, null, null], // y1
      [new Slot(0, 0, leftOnEngineRoom), new Slot(0, 0, enginesRoom), new Slot(1, 0, enginesRoom), null, new Slot(0, 0, weaponsControlRoom), new Slot(1, 0, weaponsControlRoom, weaponsControlRoom.affectedCrew), new Slot(0, 0, mindControlRoom), new Slot(1, 0, mindControlRoom), new Slot(0, 0, medbayRoom), new Slot(1, 0, medbayRoom), new Slot(0, 0, doorControlRoom), new Slot(1, 0, doorControlRoom), new Slot(0, 0, dronesControlRoom), new Slot(1, 0, dronesControlRoom), new Slot(0, 0, pilotingRoom, pilotingRoom.affectedCrew)], // y2
      [new Slot(0, 1, leftOnEngineRoom), new Slot(0, 1, enginesRoom, enginesRoom.affectedCrew), new Slot(1, 1, enginesRoom), null, new Slot(0, 1, weaponsControlRoom), new Slot(1, 1, weaponsControlRoom), new Slot(0, 0, cloackingRoom), new Slot(0, 1, cloackingRoom), new Slot(0, 0, shieldRoom), new Slot(1, 0, shieldRoom), new Slot(0, 0, sensorRoom), new Slot(1, 0, sensorRoom), new Slot(0, 1, dronesControlRoom), new Slot(1, 1, dronesControlRoom), new Slot(0, 1, pilotingRoom)], // y3
      [null, new Slot(0, 0, teleportRoom), new Slot(0, 1, teleportRoom), new Slot(0, 0, hackingRoom), new Slot(1, 0, hackingRoom), null, new Slot(0, 0, cloackingRoom), new Slot(1, 0, cloackingRoom), new Slot(0, 1, shieldRoom), new Slot(1, 1, shieldRoom), null, null, null, null, null], // y4
      [null, null, null, null, null, null, new Slot(0, 0, bottomExternalDoorsRoom), new Slot(1, 0, bottomExternalDoorsRoom), null, null, null, null, null, null, null], // y5
    ];
  }
}
