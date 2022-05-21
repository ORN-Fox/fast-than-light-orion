import { Ship } from '../ship.model';

import { Crew, Gender } from '../../crew/crew.model';
import { Human } from '../../races/human/human.model';

import { Door } from '../../door/door.model';
import { Room, RoomDisplaySettings } from '../../room/index';
import { Battery, Cloacking, DroneControl, DoorControl, Engine, Hacking, Medbay, MindControl, Oxygen, Piloting, Sensor, Shield, Teleport, WeaponControl } from '../../systems/index';

import { Artemis, BurstLaserII } from '../../weapons/index';

export class KestrelLayoutA extends Ship {
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

    this.rooms = [
      new Room(new RoomDisplaySettings(339, 211, 2, 2), new Shield(2)),
      new Room(new RoomDisplaySettings(94, 177, 2, 2), new Engine(2), this.crews[1]), // Human Female
      new Room(new RoomDisplaySettings(94, 140, 2, 1), new Oxygen()),
      new Room(new RoomDisplaySettings(199, 177, 2, 2), new WeaponControl(3), this.crews[2]), // Human Female
      new Room(new RoomDisplaySettings(339, 141, 2, 2), new Medbay()),
      new Room(new RoomDisplaySettings(549, 176, 1, 2), new Piloting(), this.crews[0]), // Human Male
      new Room(new RoomDisplaySettings(409, 211, 2, 1), new Sensor()),
      new Room(new RoomDisplaySettings(409, 174, 2, 1), new DoorControl()),
      new Room(new RoomDisplaySettings(94, 247, 2, 1), new Teleport(1, false)), // Botton on engine
      new Room(new RoomDisplaySettings(164, 247, 2, 1), new Hacking(1, 0, false)), // Bottom of weapons // Manage advancedEditionEnabled
      new Room(new RoomDisplaySettings(164, 140, 2, 1), new Battery(1, 0, false)), // Right on oxygen
      new Room(new RoomDisplaySettings(57, 177, 1, 2)), // Left on engine
      new Room(new RoomDisplaySettings(269, 104, 2, 1)), // Top external doors on center of ship
      new Room(new RoomDisplaySettings(269, 141, 2, 2), new MindControl(1, 0, false)), // Bottom of top external doors
      new Room(new RoomDisplaySettings(269, 211, 2, 2), new Cloacking(1, 0, false)), // Top of bottom external doors
      new Room(new RoomDisplaySettings(269, 281, 2, 1)), // Bottom external doors on center of ship
      new Room(new RoomDisplaySettings(479, 176, 2, 2), new DroneControl(1, 0, false)) // Left of piloting
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
  }
}
