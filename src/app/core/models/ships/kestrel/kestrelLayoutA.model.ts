import { KestrelShip } from './kestrelShip.model';

import { Crew, Gender } from '../../crew/crew.model';
import { Human } from '../../races/human/human.model';

import { Door } from '../../door/door.model';
import { Room, RoomDisplaySettings } from '../../room/index';
import { Battery, Cloacking, DroneControl, DoorControl, Engine, Hacking, Medbay, MindControl, Oxygen, Piloting, Sensor, Shield, SystemPositionEnum, Teleport, WeaponControl } from '../../systems/index';

import { Artemis, BurstLaserII } from '../../weapons/index';

export class KestrelLayoutA extends KestrelShip {
  constructor() {
    super();

    this.name = this.originalName = 'The Kestrel';
    this.layout = 'A';

    this.hull = this.maxHull = 300;
    this.reactorPower = 8;
    this.fuel = 16;
    this.missiles = 8;
    this.droneParts = 2;

    this.crews = [
      new Crew('Human 1', new Human(), Gender.Male),
      new Crew('Human 2', new Human(), Gender.Female),
      new Crew('Human 3', new Human(), Gender.Female)
    ];

    let shieldRoom = new Room(new RoomDisplaySettings(339, 211, 2, 2), new Shield(2, SystemPositionEnum.Left)),
      enginesRoom = new Room(new RoomDisplaySettings(94, 177, 2, 2), new Engine(2, SystemPositionEnum.Bottom), this.crews[1]), // Human Female
      oxygenRoom = new Room(new RoomDisplaySettings(94, 140, 2, 1), new Oxygen()),
      weaponsControlRoom = new Room(new RoomDisplaySettings(199, 177, 2, 2), new WeaponControl(3), this.crews[2]), // Human Female
      medbayRoom = new Room(new RoomDisplaySettings(339, 141, 2, 2), new Medbay()),
      pilotingRoom = new Room(new RoomDisplaySettings(549, 176, 1, 2), new Piloting(1, SystemPositionEnum.Right), this.crews[0]), // Human Male
      sensorRoom = new Room(new RoomDisplaySettings(409, 211, 2, 1), new Sensor(1, SystemPositionEnum.Bottom)),
      doorControlRoom = new Room(new RoomDisplaySettings(409, 174, 2, 1), new DoorControl()),
      teleportRoom = new Room(new RoomDisplaySettings(94, 247, 2, 1), new Teleport(1, false)), // Botton on engine
      hackingRoom = new Room(new RoomDisplaySettings(164, 247, 2, 1), new Hacking(1, 0, false)), // Bottom of weapons // Manage advancedEditionEnabled
      batteryRoom = new Room(new RoomDisplaySettings(164, 140, 2, 1), new Battery(1, 0, false)), // Right on oxygen
      leftOnEngineRoom = new Room(new RoomDisplaySettings(57, 177, 1, 2)), // Left on engine
      topExternalDoorsRoom = new Room(new RoomDisplaySettings(269, 104, 2, 1)), // Top external doors on center of ship
      mindControlRoom = new Room(new RoomDisplaySettings(269, 141, 2, 2), new MindControl(1, 0, false)), // Bottom of top external doors
      cloackingRoom = new Room(new RoomDisplaySettings(269, 211, 2, 2), new Cloacking(1, 0, false)), // Top of bottom external doors
      bottomExternalDoorsRoom = new Room(new RoomDisplaySettings(269, 281, 2, 1)), // Bottom external doors on center of ship
      dronesControlRoom = new Room(new RoomDisplaySettings(479, 176, 2, 2), new DroneControl(1, 0, false)) // Left of piloting

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
      new Door(39, 177), // Left Top of left external doors room
      new Door(39, 210), // left Bottom of left external doors room
      new Door(75, 177), // Left Top of engines room
      new Door(75, 210), // Left Bottom of engines room
      new Door(160, 158, 90), // Top of engines room
      new Door(145, 139), // Right of oxygen room
      new Door(145, 246), // Right of teleport room
      new Door(232, 158, 90), // Bottom Right of battery room
      new Door(232, 228, 90), // Top Right of hacking room
      new Door(250, 177), // Right Top of weapons room
      new Door(250, 210), // Right Bottom of weapons room
      new Door(303, 85, 90), // Top Left of top of mind room
      new Door(336, 85, 90), // Top Right of top of mind room
      new Door(303, 122, 90), // Top Left of mind room
      new Door(336, 122, 90), // Top Right of mind room
      new Door(320, 139), // Right Top of mind room
      new Door(320, 245), // Right Bottom of cloacking room
      new Door(303, 262, 90), // Bottom Left of cloacking room
      new Door(336, 262, 90), // Bottom Right of cloacking room
      new Door(303, 298, 90), // Top Left of bottom of cloacking room
      new Door(336, 298, 90), // Top Right of bottom of cloacking room
      new Door(390, 175), // Right Bottom of medbay room
      new Door(390, 210), // Right Top of shields room
      new Door(460, 175), // Right of doors room
      new Door(460, 210), // Right of sensors room
      new Door(530, 210) // Right Bottok of drones room
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
    this.hullSpriteX = 300;
    this.hullSpriteY = 0;
    this.interiorSpriteX = 350;
    this.interiorSpriteY = 97;

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


// Experimental
export class Slot {
  slotPositionX: number;
  slotPositionY: number;

  room: Room | null;
  crew: Crew | null;
  enemy: any; // TODO Manage enemny

  doors: any; // Manage doors : axes X/Y

  breach: boolean = false;
  fire: boolean = false;
  hacking: boolean = false;

  constructor(slotPositionX: number, slotPositionY: number, room: Room | null = null, crew: Crew | null = null)
  {
    this.slotPositionX = slotPositionX;
    this.slotPositionY = slotPositionY;

    this.room = room;

    if (this.room)
    {
      this.crew = crew;
    }
  }
}
