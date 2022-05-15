import { Ship } from '../ship.model';

import { Crew, Gender } from '../../crew/crew.model';
import { Engi, Human } from '../../races/index';

import { Room } from '../../room/room.model';
import { Door, DroneControl, Engine, Medbay, Oxygen, Piloting, Sensor, Shield, WeaponControl } from '../../systems/index';

import { Drone } from '../../drone/drone.model';
import { Upgrade } from '../../upgrade/upgrade.model';
import { Weapon } from '../../weapon/weapon.model';

export class EngiLayoutA extends Ship {
  constructor() {
    super();

    this.name = this.originalName = 'The Torus';
    this.layout = 'A';

    this.hull = this.maxHull = 300;
    this.reactorPower = 10;
    this.fuel = 16;
    this.missiles = 0;
    this.droneParts = 15;

    this.crews = [
      new Crew('Engi 1', new Engi(), Gender.Other),
      new Crew('Engi 2', new Engi(), Gender.Other),
      new Crew('Human 1', new Human(), Gender.Male)
    ];

    this.rooms = [
      new Room(new Shield(2)),
      new Room(new Engine(2), this.crews[0]),
      new Room(new Oxygen()),
      new Room(new WeaponControl(3), this.crews[1]),
      new Room(new DroneControl(3)),
      new Room(new Medbay()),
      new Room(new Piloting(), this.crews[2]),
      new Room(new Sensor()),
      new Room(new Door())
    ];

    this.weapons = [
      new Weapon() // Ion Blast II
    ];

    this.drones = [
      new Drone() // Combat Mark I
    ];

    this.upgrades = [
      new Upgrade() // Engi Med-bot Dispersal
    ];

    // Capacities related
    this.maxWeaponsAllowed = 3;
    this.maxDronesAllowed = 3;
    this.maxCrewsAllowed = 6;
    this.maxUpgradesAllowed = 3;

    // Display related
    this.srcHullSprite = '/assets/images/ships/engi/layout_a/engi_a_base.png';
    this.srcInteriorSprite = '/assets/images/ships/engi/layout_a/engi_a_floor.png';
  }
}
