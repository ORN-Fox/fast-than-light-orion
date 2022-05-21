import { Ship } from '../ship.model';

import { Crew, Gender } from '../../crew/crew.model';
import { Human, Lanius } from '../../races/index';

import { Room, RoomDisplaySettings } from '../../room/index';
import { Battery, Cloacking, CloneBay, DroneControl, Door, Engine, Hacking, MindControl, Oxygen, Piloting, Sensor, Shield, Teleport, WeaponControl } from '../../systems/index';

import { DualLasers, IonStunner } from '../../weapons/index';

export class KestrelLayoutC extends Ship {
  constructor() {
    super();

    this.name = this.originalName = 'The Swallow';
    this.layout = 'C';

    this.hull = this.maxHull = 300;
    this.reactorPower = 8;
    this.fuel = 16;
    this.missiles = 4;
    this.droneParts = 3;

    this.crews = [
      new Crew('Human 1', new Human(), Gender.Male),
      new Crew('Human 2', new Human(), Gender.Female),
      new Crew('Lanius', new Lanius(), Gender.Other)
    ];

    this.rooms = [
      new Room(new RoomDisplaySettings(198, 211, 2, 2), new Shield(2, 3)),
      new Room(new RoomDisplaySettings(59, 176, 2, 2), new Engine(2), this.crews[1]),
      new Room(new RoomDisplaySettings(302, 176, 1, 2), new Oxygen(1, 6)),
      new Room(new RoomDisplaySettings(198, 141, 2, 2), new WeaponControl(2, 2), this.crews[2]),
      new Room(new RoomDisplaySettings(547, 176, 1, 2), new Piloting(), this.crews[0]),
      new Room(new RoomDisplaySettings(478, 209, 2, 1), new Sensor(2)),
      new Room(new RoomDisplaySettings(478, 176, 2, 1), new Door()),
      new Room(new RoomDisplaySettings(408, 176, 2, 2), new CloneBay(1)),
      new Room(new RoomDisplaySettings(94, 140, 2, 1), new Cloacking(1, 3, false)),
      new Room(new RoomDisplaySettings(129, 176, 2, 2), new DroneControl(1, 13, false)),
      new Room(new RoomDisplaySettings(94, 245, 2, 1), new Hacking(1, 0, false)), // Manage advancedEditionEnabled
      new Room(new RoomDisplaySettings(268, 104, 2, 1)), // Top external doors on center of ship
      new Room(new RoomDisplaySettings(268, 140, 2, 1)), // Bottom of top external doors
      new Room(new RoomDisplaySettings(268, 246, 2, 1)), // Top of bottom external doors
      new Room(new RoomDisplaySettings(268, 282, 2, 1)), // Bottom external doors on center of ship
      new Room(new RoomDisplaySettings(338, 140, 2, 1), new Teleport(1, false)),
      new Room(new RoomDisplaySettings(338, 246, 2, 1), new MindControl(1, 1, false)),
      new Room(new RoomDisplaySettings(371, 176, 1, 2), new Battery(1, 6, false)),
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
    this.interiorSpriteX = 350;
    this.interiorSpriteY = 97;
  }
}
