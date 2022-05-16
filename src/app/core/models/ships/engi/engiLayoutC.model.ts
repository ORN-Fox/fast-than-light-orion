import { Ship } from '../ship.model';

import { Crew, Gender } from '../../crew/crew.model';
import { Engi, Lanius } from '../../races/index';

import { Room } from '../../room/room.model';
import { CloneBay, Door, DroneControl, Engine, Hacking, Oxygen, Piloting, Sensor, Shield, WeaponControl } from '../../systems/index';

import { Drone } from '../../drone/drone.model';
import { Upgrade } from '../../upgrade/upgrade.model';
import { DualLasers } from '../../weapons/armory/lasers/dualLasers.model';

export class EngiLayoutC extends Ship {
  constructor() {
    super();

    this.name = this.originalName = 'Tetragon';
    this.layout = 'C';

    this.hull = this.maxHull = 300;
    this.reactorPower = 9;
    this.fuel = 16;
    this.missiles = 0;
    this.droneParts = 25;

    this.crews = [
      new Crew('Lanius 1', new Lanius(), Gender.Other),
      new Crew('Engi 1', new Engi(), Gender.Other),
      new Crew('Engi 2', new Engi(), Gender.Male)
    ];

    this.rooms = [
      new Room(new Shield(2)),
      new Room(new Engine(2), this.crews[2]),
      new Room(new Oxygen()),
      new Room(new WeaponControl(), this.crews[1]),
      new Room(new DroneControl(2)),
      new Room(new Piloting(), this.crews[0]),
      new Room(new Sensor()),
      new Room(new Door()),
      new Room(new CloneBay()),
      new Room(new Hacking())
    ];

    this.weapons = [
      new DualLasers() // Dual Lasers
    ];

    this.drones = [
      new Drone() // Beam I
    ];

    this.upgrades = [
      new Upgrade() // Defense Scrambler
    ];

    // Capacities related
    this.maxWeaponsAllowed = 3;
    this.maxDronesAllowed = 3;
    this.maxCrewsAllowed = 6;
    this.maxUpgradesAllowed = 3;

    // Display related
    this.srcHullSprite = '/assets/images/ships/engi/layout_c/circle_cruiser_c_base.png';
    this.srcInteriorSprite = '/assets/images/ships/engi/layout_c/circle_cruiser_c_floor.png';

  }
}
