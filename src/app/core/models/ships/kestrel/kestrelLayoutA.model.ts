import { Ship } from '../ship.model';

import { Crew, Gender } from '../../crew/crew.model';
import { Human } from '../../races/human/human.model';

import { Room } from '../../room/room.model';
import { Door, Engine, Medbay, Oxygen, Piloting, Sensor, Shield, WeaponControl } from '../../systems/index';

import { Weapon } from '../../weapons/weapon.model';

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
      new Room(new Shield(2)),
      new Room(new Engine(2), this.crews[1]),
      new Room(new Oxygen()),
      new Room(new WeaponControl(3), this.crews[2]),
      new Room(new Medbay()),
      new Room(new Piloting(), this.crews[0]),
      new Room(new Sensor()),
      new Room(new Door())
    ];

    this.weapons = [
      new Weapon(), // Burst Laser II
      new Weapon() // Artemis Missiles
    ];

    // Capacities related
    this.maxWeaponsAllowed = 4;
    this.maxDronesAllowed = 2;
    this.maxCrewsAllowed = 6;
    this.maxUpgradesAllowed = 3;

    // Display related
    this.srcHullSprite = '/assets/images/ships/kestrel/layout_a/kestral_a_base.png';
    this.srcInteriorSprite = '/assets/images/ships/kestrel/layout_a/kestral_a_floor.png';
  }
}
