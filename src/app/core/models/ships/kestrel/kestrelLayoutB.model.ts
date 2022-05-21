import { Ship } from '../ship.model';

import { Crew, Gender } from '../../crew/crew.model';
import { Human, Mantis, Zoltan } from '../../races/index';

import { Room, RoomDisplaySettings } from '../../room/index';
import { Battery, Cloacking, Door, DroneControl, Engine, Hacking, Medbay, MindControl, Oxygen, Piloting, Sensor, Shield, Teleport, WeaponControl } from '../../systems/index';

import { BasicLaser } from '../../weapons/armory/lasers/basicLaser.model';

export class KestrelLayoutB extends Ship {
  constructor() {
    super();

    this.name = this.originalName = 'Red-Tail';
    this.layout = 'B';

    this.hull = this.maxHull = 300;
    this.reactorPower = 8;
    this.fuel = 16;
    this.missiles = 5;
    this.droneParts = 0;

    this.crews = [
      new Crew('Human 1', new Human(), Gender.Male),
      new Crew('Human 2', new Human(), Gender.Female),
      new Crew('Mantis', new Mantis(), Gender.Other),
      new Crew('Zoltan', new Zoltan(), Gender.Other)
    ];

    this.rooms = [
      new Room(new RoomDisplaySettings(128, 122, 2, 2), new Shield(2), this.crews[2]),
      new Room(new RoomDisplaySettings(94, 192,  2, 1), new Engine(2), this.crews[1]),
      new Room(new RoomDisplaySettings(302, 123, 2, 2), new Oxygen()),
      new Room(new RoomDisplaySettings(128, 229, 2, 2), new WeaponControl(4), this.crews[3]),
      new Room(new RoomDisplaySettings(198, 87, 2, 2), new Medbay()),
      new Room(new RoomDisplaySettings(512, 192,  2, 1), new Piloting(), this.crews[0]),
      new Room(new RoomDisplaySettings(232, 229, 2, 1), new Sensor()),
      new Room(new RoomDisplaySettings(372, 192, 2, 1), new Door()),
      new Room(new RoomDisplaySettings(268, 87, 2, 1), new MindControl(1, false)),
      new Room(new RoomDisplaySettings(232, 156, 2, 1), new Teleport(1, false)),
      new Room(new RoomDisplaySettings(302, 192, 2, 1), new Battery(1, false)),
      new Room(new RoomDisplaySettings(198, 266, 2, 2), new DroneControl(1, false)),
      new Room(new RoomDisplaySettings(302, 229, 2, 2), new Cloacking(1, false)),
      new Room(new RoomDisplaySettings(268, 299, 2, 1), new Hacking(1, false)), // Manage advancedEditionEnabled
      new Room(new RoomDisplaySettings(442, 192, 2, 1)), // right of door control
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
  }
}
