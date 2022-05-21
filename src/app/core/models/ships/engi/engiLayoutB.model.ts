import { Ship } from '../ship.model';

import { Crew, Gender } from '../../crew/crew.model';
import { Engi } from '../../races/engi/engi.model';

import { Room } from '../../room/room.model';
import { DoorControl, DroneControl, Engine, Medbay, Oxygen, Piloting, Shield, WeaponControl } from '../../systems/index';

import { AntiPersonnel, SystemRepair } from '../../drones/index';
import { DroneReactorBooster } from '../../upgrades/index';
import { HeavyIon, HeavyLaserI } from '../../weapons/index';

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
      // new Room(new Shield(2)),
      // new Room(new Engine()),
      // new Room(new Oxygen()),
      // new Room(new WeaponControl(3)),
      // new Room(new DroneControl(3)),
      // new Room(new Medbay()),
      // new Room(new Piloting(), this.crews[0]), // Engi
      // new Room(new DoorControl())
    ];

    this.weapons = [
      new HeavyIon(),
      new HeavyLaserI()
    ];

    this.drones = [
      new AntiPersonnel(),
      new SystemRepair(),
      new SystemRepair()
    ];

    this.upgrades = [
      new DroneReactorBooster()
    ];

    // Capacities related
    this.maxWeaponsAllowed = 3;
    this.maxDronesAllowed = 3;
    this.maxCrewsAllowed = 6;
    this.maxUpgradesAllowed = 3;

    // Display related
    this.srcHullSprite = '/assets/images/ships/engi/layout_b/circle_cruiser_b_base.png';
    this.srcInteriorSprite = '/assets/images/ships/engi/layout_b/circle_cruiser_b_floor.png';

    // Shed display related
    this.hullSpriteX = 400;
    this.hullSpriteY = 50;
    this.interiorSpriteX = 439;
    this.interiorSpriteY = 64;
  }
}
