import { CrewsService } from '../../../services/crews/crews.service';

import { EngiShip } from './engiShip.model';

import { Crew, Gender } from '../../crew/crew.model';
import { Engi, Human } from '../../races/index';

import { Door } from '../../door/door.model';
import { Room, RoomDisplaySettings } from '../../room/index';
import { Battery, Cloacking, DoorControl, DroneControl, Engine, Hacking, Medbay, MindControl, Oxygen, Piloting, Sensor, Shield, SystemPositionEnum, Teleport, WeaponControl } from '../../systems/index';
import { Slot } from '../../slot/slot.model';

import { CombatI } from '../../drones/index';
import { EngiMedbotDispersal } from '../../upgrades/index';
import { IonBlastII } from '../../weapons/armory/ions/ionBlastII.model';

export class EngiLayoutA extends EngiShip {

  constructor(crewsService: CrewsService) {
    super();

    this.name = this.originalName = 'The Torus';
    this.layout = 'A';

    this.hull = this.maxHull = 300;
    this.reactorPower = 10;
    this.fuel = 16;
    this.missiles = 0;
    this.droneParts = 15;

    this.crews = [
      crewsService.createCrew(new Engi(), Gender.Other),
      crewsService.createCrew(new Engi(), Gender.Other),
      crewsService.createCrew(new Human(), Gender.Male)
    ];

    let shieldRoom = new Room(new RoomDisplaySettings(7, 7, 2, 2), new Shield(2, SystemPositionEnum.Left, 4)),
      enginesRoom = new Room(new RoomDisplaySettings(5, 7, 2, 2), new Engine(2, SystemPositionEnum.Bottom, 2), this.crews[0]), // Engi
      oxygenRoom = new Room(new RoomDisplaySettings(7, 4, 1, 2), new Oxygen(1, 4)),
      weaponsControlRoom = new Room(new RoomDisplaySettings(11, 4, 2, 2), new WeaponControl(3), this.crews[1]), // Engi
      droneControlRoom = new Room(new RoomDisplaySettings(5, 3, 2, 2), new DroneControl(3)),
      medbayRoom = new Room(new RoomDisplaySettings(11, 8, 2, 2), new Medbay()),
      pilotingRoom = new Room(new RoomDisplaySettings(13, 8, 1, 2), new Piloting(1, SystemPositionEnum.Right), this.crews[2]), // Human Male
      sensorRoom = new Room(new RoomDisplaySettings(9, 6, 1, 2), new Sensor(1, SystemPositionEnum.Left, 4)),
      doorControlRoom = new Room(new RoomDisplaySettings(9, 8, 1, 2), new DoorControl(1, SystemPositionEnum.Right, 4)),
      batteryRoom = new Room(new RoomDisplaySettings(6, 5, 1, 2), new Battery(1, 6, false)),
      hackingRoom = new Room(new RoomDisplaySettings(8, 4, 2, 1), new Hacking(1, 2, false)),
      topOfHackingRoom = new Room(new RoomDisplaySettings(8, 3, 2, 1)), // Top of hacking room
      cloackingRoom = new Room(new RoomDisplaySettings(10, 3, 1, 2), new Cloacking(1, 4, false)),
      mindControlRoom = new Room(new RoomDisplaySettings(10, 7, 1, 2), new MindControl(1, 6, false)),
      teleportRoom = new Room(new RoomDisplaySettings(11, 6, 1, 2), new Teleport(1, false)),
      rightOfTeleportRoom = new Room(new RoomDisplaySettings(12, 6, 1, 2)); // Right of teleport room

    this.rooms = [
      shieldRoom,
      enginesRoom,
      oxygenRoom,
      weaponsControlRoom,
      droneControlRoom,
      medbayRoom,
      pilotingRoom,
      sensorRoom,
      doorControlRoom,
      batteryRoom,
      hackingRoom,
      topOfHackingRoom,
      cloackingRoom,
      mindControlRoom,
      teleportRoom,
      rightOfTeleportRoom
    ];

    this.doors = [
      new Door(7, 4.5, 90), // Bottom of drone control room
      new Door(6.5, 5), // Right of battery room
      new Door(7, 6.5, 90), // Top of engines room
      new Door(6.5, 8), // Right of engines room
      new Door(7.5, 4), // Right of oxygen room
      new Door(9, 2.5, 90), // Top left of top external door room
      new Door(10, 2.5, 90), // Top right of top external door room
      new Door(9, 3.5, 90), // Top left of top hacking room
      new Door(10, 3.5, 90), // Top right of top hacking room
      new Door(9.5, 4), // Right of hacking room
      new Door(10.5, 4), // Right of cloacking room
      new Door(8.5, 8), // Right of shields room
      new Door(10, 7.5, 90), // Top of door control room
      new Door(9.5, 7), // Right of sensor room
      new Door(10.5, 7), // Right top of mind control room
      new Door(10.5, 8), // Right bottom of mind control room
      new Door(12, 5.5, 90), // Bottom of weapons control room
      new Door(11.5, 6), // Right of teleport room
      new Door(12, 7.5, 90), // Bottom of teleport room
      new Door(12.5, 6), // Right Top of Right external doors room
      new Door(12.5, 7), // Right Bottom of Right external doors room
      new Door(12.5, 9) // Right of piloting room
    ];

    this.weapons = [
      new IonBlastII()
    ];

    this.drones = [
      new CombatI()
    ];

    this.upgrades = [
      new EngiMedbotDispersal()
    ];

    // Capacities related
    this.maxWeaponsAllowed = 3;
    this.maxDronesAllowed = 3;
    this.maxCrewsAllowed = 6;
    this.maxUpgradesAllowed = 3;

    // Display related
    this.srcHullSprite = '/assets/images/ships/engi/layout_a/circle_cruiser_a_base.png';
    this.srcInteriorSprite = '/assets/images/ships/engi/layout_a/circle_cruiser_a_floor.png';

    // Shed display related
    this.hullSpriteX = 400;
    this.hullSpriteY = 50;
    this.interiorSpriteX = 465;
    this.interiorSpriteY = 97;

    // Experimental
    this.shipRepresentation = [
      [new Slot(0, 0, droneControlRoom), new Slot(1, 0, droneControlRoom), null, new Slot(0, 0, topOfHackingRoom), new Slot(1, 0, topOfHackingRoom), new Slot(0, 0, cloackingRoom), null, null, null], // y0
      [new Slot(0, 1, droneControlRoom), new Slot(1, 1, droneControlRoom), new Slot(0, 0, oxygenRoom), new Slot(0, 0, hackingRoom), new Slot(1, 0, hackingRoom), new Slot(0, 1, hackingRoom), new Slot(0, 0, weaponsControlRoom), new Slot(1, 0, weaponsControlRoom, weaponsControlRoom.affectedCrew), null], // y1
      [null, new Slot(0, 0, batteryRoom), new Slot(0, 1, oxygenRoom), null, null, null, new Slot(0, 1, weaponsControlRoom), new Slot(1, 1, weaponsControlRoom), null], // y2
      [null, new Slot(0, 1, batteryRoom), null, null, new Slot(0, 0, sensorRoom), null, new Slot(0, 0, teleportRoom), new Slot(0, 0, rightOfTeleportRoom), null], // y3
      [new Slot(0, 0, enginesRoom), new Slot(1, 0, enginesRoom), new Slot(0, 0, shieldRoom), new Slot(0, 1, sensorRoom), new Slot(0, 0, mindControlRoom), new Slot(0, 1, teleportRoom), new Slot(0, 1, rightOfTeleportRoom), null], // y4
      [new Slot(0, 1, enginesRoom, enginesRoom.affectedCrew), new Slot(1, 1, enginesRoom), new Slot(0, 1, shieldRoom), new Slot(1, 1, sensorRoom), new Slot(0, 0, doorControlRoom), new Slot(0, 1, mindControlRoom), new Slot(0, 0, medbayRoom), null, new Slot(0, 0, pilotingRoom, pilotingRoom.affectedCrew)], // y5
      [null, null, null, null, new Slot(0, 1, doorControlRoom), null, new Slot(0, 1, medbayRoom), new Slot(1, 1, medbayRoom), new Slot(0, 1, pilotingRoom)] // y6
    ];
  }
}
