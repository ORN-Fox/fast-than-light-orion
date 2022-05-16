import { Ship } from '../ship.model';

import { Crew, Gender } from '../../crew/crew.model';
import { Engi } from '../../races/engi/engi.model';

import { Room } from '../../room/room.model';
import { Door, DroneControl, Engine, Medbay, Oxygen, Piloting, Shield, WeaponControl } from '../../systems/index';

import { Drone } from '../../drone/drone.model';
import { Upgrade } from '../../upgrade/upgrade.model';
import { Weapon } from '../../weapons/weapon.model';

export class EngiLayoutB extends Ship {
  constructor() {
    super();

    this.name = this.originalName = 'The Vortex';
    this.layout = 'B';

    this.hull = this.maxHull = 300;
    this.reactorPower = 9;
    this.fuel = 16;
    this.missiles = 0;
    this.droneParts = 6;

    this.crews = [
      new Crew('Engi 1', new Engi(), Gender.Other)
    ];

    this.rooms = [
      new Room(new Shield(2)),
      new Room(new Engine()),
      new Room(new Oxygen()),
      new Room(new WeaponControl(3)),
      new Room(new DroneControl(3)),
      new Room(new Medbay()),
      new Room(new Piloting(), this.crews[0]),
      new Room(new Door())
    ];

    this.weapons = [
      new Weapon(), // Heavy Ion
      new Weapon() // Heavy Laser I
    ];

    this.drones = [
      new Drone(), // Anti-Personal Drone
      new Drone(), // System Repair Drone
      new Drone() // System Repair Drone
    ];

    this.upgrades = [
      new Upgrade() // Drone Reactor Booster
    ];

    // Capacities related
    this.maxWeaponsAllowed = 3;
    this.maxDronesAllowed = 3;
    this.maxCrewsAllowed = 6;
    this.maxUpgradesAllowed = 3;

    // Display related
    this.srcHullSprite = '/assets/images/ships/engi/layout_b/circle_cruiser_b_base.png';
    this.srcInteriorSprite = '/assets/images/ships/engi/layout_b/circle_cruiser_b_floor.png';
  }
}
