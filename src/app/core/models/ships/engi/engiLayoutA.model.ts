import { Ship } from '../ship.model';

import { Crew, Gender } from '../../crew/crew.model';
import { Engi, Human } from '../../races/index';

import { Room } from '../../room/room.model';
import { Door, DroneControl, Engine, Medbay, Oxygen, Piloting, Sensor, Shield, WeaponControl } from '../../systems/index';

import { CombatI } from '../../drones/index';
import { EngiMedbotDispersal } from '../../upgrades/index';
import { IonBlastII } from '../../weapons/armory/ions/ionBlastII.model';

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
      // new Room(new Shield(2)),
      // new Room(new Engine(2), this.crews[0]),
      // new Room(new Oxygen()),
      // new Room(new WeaponControl(3), this.crews[1]),
      // new Room(new DroneControl(3)),
      // new Room(new Medbay()),
      // new Room(new Piloting(), this.crews[2]),
      // new Room(new Sensor()),
      // new Room(new Door())
    ];

    this.weapons = [
      new IonBlastII()
    ];

    this.drones = [
      new CombatI()
    ];

    this.upgrades = [
      new EngiMedbotDispersal()
    ];

    // Capacities related
    this.maxWeaponsAllowed = 3;
    this.maxDronesAllowed = 3;
    this.maxCrewsAllowed = 6;
    this.maxUpgradesAllowed = 3;

    // Display related
    this.srcHullSprite = '/assets/images/ships/engi/layout_a/circle_cruiser_a_base.png';
    this.srcInteriorSprite = '/assets/images/ships/engi/layout_a/circle_cruiser_a_floor.png';

    // Shed display related
    this.hullSpriteX = 400;
    this.hullSpriteY = 50;
    this.interiorSpriteX = 455;
    this.interiorSpriteY = 82;

  }
}
