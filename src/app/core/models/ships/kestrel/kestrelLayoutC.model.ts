import { Ship } from '../ship.model';

import { Crew, Gender } from '../../crew/crew.model';
import { Human, Lanius } from '../../races/index';

import { Room } from '../../room/room.model';
import { Door, Engine, CloneBay, Oxygen, Piloting, Sensor, Shield, WeaponControl } from '../../systems/index';

import { Weapon } from '../../weapon/weapon.model';

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
      new Room(new Shield(2)),
      new Room(new Engine(2), this.crews[1]),
      new Room(new Oxygen()),
      new Room(new WeaponControl(2), this.crews[2]),
      new Room(new Piloting(), this.crews[0]),
      new Room(new Sensor(2)),
      new Room(new Door()),
      new Room(new CloneBay())
    ];

    this.weapons = [
      new Weapon(), // Dual Laser
      new Weapon() // Ion Stunner
    ];

    // Capacities related
    this.maxWeaponsAllowed = 4;
    this.maxDronesAllowed = 2;
    this.maxCrewsAllowed = 6;
    this.maxUpgradesAllowed = 3;

    // Display related
    this.srcHullSprite = '/assets/images/ships/kestrel/layout_c/kestral_c_base.png';
    this.srcInteriorSprite = '/assets/images/ships/kestrel/layout_c/kestral_c_floor.png';
  }
}
