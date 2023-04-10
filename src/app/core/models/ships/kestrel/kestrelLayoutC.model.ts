import { CrewsService } from '../../../services/crews/crews.service';

import { KestrelShip } from './kestrelShip.model';

import { Crew, Gender } from '../../crew/crew.model';
import { Human, Lanius } from '../../races/index';

import { Room, RoomDisplaySettings } from '../../room/index';
import { Battery, Cloacking, CloneBay, DroneControl, DoorControl, Engine, Hacking, MindControl, Oxygen, Piloting, Sensor, Shield, SystemPositionEnum, Teleport, WeaponControl } from '../../systems/index';
import { Slot } from '../../slot/slot.model';

import { DualLasers, IonStunner } from '../../weapons/index';

export class KestrelLayoutC extends KestrelShip {

  constructor(crewsService: CrewsService) {
    super();

    this.name = this.originalName = 'The Swallow';
    this.layout = 'C';

    this.hull = this.maxHull = 300;
    this.reactorPower = 8;
    this.fuel = 16;
    this.missiles = 4;
    this.droneParts = 3;

    this.crews = [
      crewsService.createCrew(new Human(), Gender.Male),
      crewsService.createCrew(new Human(), Gender.Female),
      crewsService.createCrew(new Lanius(), Gender.Other)
    ];

    let shieldRoom = new Room(new RoomDisplaySettings(6, 6, 2, 2), new Shield(2, SystemPositionEnum.Left, 3)),
      enginesRoom = new Room(new RoomDisplaySettings(2, 5, 2, 2), new Engine(2, SystemPositionEnum.Bottom), this.crews[1]), // Human Female
      oxygenRoom = new Room(new RoomDisplaySettings(9, 5, 1, 2), new Oxygen(1, 6)),
      weaponsControlRoom = new Room(new RoomDisplaySettings(6, 4, 2, 2), new WeaponControl(2, SystemPositionEnum.Top, 2), this.crews[2]), // Lanius
      pilotingRoom = new Room(new RoomDisplaySettings(16, 5, 1, 2), new Piloting(1, SystemPositionEnum.Right), this.crews[0]), // Human Male
      sensorRoom = new Room(new RoomDisplaySettings(14, 6, 2, 1), new Sensor(2, SystemPositionEnum.Bottom)),
      doorControlRoom = new Room(new RoomDisplaySettings(14, 5, 2, 1), new DoorControl()),
      cloneBayRoom = new Room(new RoomDisplaySettings(12, 5, 2, 2), new CloneBay(1)),
      cloackingRoom = new Room(new RoomDisplaySettings(3, 4, 2, 1), new Cloacking(1, 3, false)),
      droneControlRoom = new Room(new RoomDisplaySettings(4, 5, 2, 2), new DroneControl(1, 13, false)),
      hackingRoom = new Room(new RoomDisplaySettings(3, 7, 2, 1), new Hacking(1, 0, false)),
      topExternalDoorsRoom = new Room(new RoomDisplaySettings(8, 3, 2, 1)), // Top external doors on center of ship
      bottomOfTopExternalDoorsRoom = new Room(new RoomDisplaySettings(8, 4, 2, 1)), // Bottom of top external doors
      topOfBottomExternalDoorsRoom = new Room(new RoomDisplaySettings(8, 7, 2, 1)), // Top of bottom external doors
      bottomExternalDoorsRoom = new Room(new RoomDisplaySettings(8, 8, 2, 1)), // Bottom external doors on center of ship
      teleportRoom = new Room(new RoomDisplaySettings(10, 4, 2, 1), new Teleport(1, false)),
      mindControlRoom = new Room(new RoomDisplaySettings(10, 7, 2, 1), new MindControl(1, 1, false)),
      batteryRoom = new Room(new RoomDisplaySettings(11, 5, 1, 2), new Battery(1, 6, false));

    this.rooms = [
      shieldRoom,
      enginesRoom,
      oxygenRoom,
      weaponsControlRoom,
      pilotingRoom,
      sensorRoom,
      doorControlRoom,
      cloneBayRoom,
      cloackingRoom,
      droneControlRoom,
      hackingRoom,
      topExternalDoorsRoom,
      bottomOfTopExternalDoorsRoom,
      topOfBottomExternalDoorsRoom,
      bottomExternalDoorsRoom,
      teleportRoom,
      mindControlRoom,
      batteryRoom
    ];

    this.weapons = [
      new DualLasers(),
      new IonStunner()
    ];

    // Capacities related
    this.maxWeaponsAllowed = 4;
    this.maxDronesAllowed = 2;
    this.maxCrewsAllowed = 6;
    this.maxUpgradesAllowed = 3;

    // Display related
    this.srcHullSprite = '/assets/images/ships/kestrel/layout_c/kestral_c_base.png';
    this.srcInteriorSprite = '/assets/images/ships/kestrel/layout_c/kestral_c_floor.png';

    // Shed display related
    this.hullSpriteX = 300;
    this.hullSpriteY = 0;
    this.interiorSpriteX = 363;
    this.interiorSpriteY = 98;

    this.shipRepresentation = [
      [null, null, null, null, null, null, new Slot(0, 0, topExternalDoorsRoom), new Slot(1, 0, topExternalDoorsRoom), null, null, null, null, null, null, null], // y0
      [null, new Slot(0, 0, cloackingRoom), new Slot(1, 0, cloackingRoom), null, new Slot(0, 0, weaponsControlRoom), new Slot(1, 0, weaponsControlRoom, weaponsControlRoom.affectedCrew), new Slot(0, 0, bottomOfTopExternalDoorsRoom), new Slot(1, 0, bottomOfTopExternalDoorsRoom), new Slot(0, 0, teleportRoom), new Slot(1, 0, teleportRoom), null, null, null, null, null], // y1
      [new Slot(0, 0, enginesRoom), new Slot(1, 0, enginesRoom), new Slot(0, 0, droneControlRoom), new Slot(1, 0, droneControlRoom), new Slot(0, 1, weaponsControlRoom), new Slot(1, 1, weaponsControlRoom), null, new Slot(0, 0, oxygenRoom), null, new Slot(0, 0, batteryRoom), new Slot(0, 0, cloneBayRoom), new Slot(1, 0, cloneBayRoom), new Slot(0, 0, doorControlRoom), new Slot(1, 0, doorControlRoom), new Slot(0, 0, pilotingRoom, pilotingRoom.affectedCrew)], // y2
      [new Slot(0, 1, enginesRoom, enginesRoom.affectedCrew), new Slot(1, 1, enginesRoom), new Slot(0, 1, droneControlRoom), new Slot(1, 1, droneControlRoom), new Slot(0, 0, shieldRoom), new Slot(1, 0, shieldRoom), null, new Slot(1, 0, oxygenRoom), null, new Slot(0, 1, batteryRoom), new Slot(0, 1, cloneBayRoom), new Slot(1, 1, cloneBayRoom), new Slot(0, 0, sensorRoom), new Slot(1, 0, sensorRoom), new Slot(0, 1, pilotingRoom)], // y3
      [null, new Slot(0, 0, hackingRoom), new Slot(1, 0, hackingRoom), null, new Slot(0, 1, shieldRoom), new Slot(1, 1, shieldRoom), new Slot(0, 0, topOfBottomExternalDoorsRoom), new Slot(1, 0, topOfBottomExternalDoorsRoom), new Slot(0, 0, mindControlRoom), new Slot(1, 0, mindControlRoom), null, null, null, null, null], // y4
      [null, null, null, null, null, null, new Slot(0, 0, bottomExternalDoorsRoom), new Slot(1, 0, bottomExternalDoorsRoom), null, null, null, null, null, null, null], // y5
    ];
  }
}
