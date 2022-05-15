import { Ship } from '../ship.model';

import { Crew, Gender } from '../../crew/crew.model';
import { Human, Mantis, Zoltan } from '../../races/index';

import { Room } from '../../room/room.model';
import { Door, Engine, Medbay, Oxygen, Piloting, Sensor, Shield, WeaponControl } from '../../systems/index';

import { Weapon } from '../../weapon/weapon.model';

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
      new Room(new Shield(2), this.crews[2]),
      new Room(new Engine(2), this.crews[1]),
      new Room(new Oxygen()),
      new Room(new WeaponControl(4), this.crews[3]),
      new Room(new Medbay()),
      new Room(new Piloting(), this.crews[0]),
      new Room(new Sensor()),
      new Room(new Door())
    ];

    this.weapons = [
      new Weapon(), // Basic Laser
      new Weapon(), // Basic Laser
      new Weapon(), // Basic Laser
      new Weapon() // Basic Laser
    ];

    // Capacities related
    this.maxSystemsAllowed = 14;
    this.maxWeaponsAllowed = 4;
    this.maxDronesAllowed = 2;
    this.maxCrewsAllowed = 6;
    this.maxUpgradesAllowed = 3;

    // Display related
    this.srcHullSprite = '/assets/images/ships/kestrel/layout_b/kestral_b_base.png';
    this.srcInteriorSprite = '/assets/images/ships/kestrel/layout_b/kestral_b_floor.png';
  }
}
