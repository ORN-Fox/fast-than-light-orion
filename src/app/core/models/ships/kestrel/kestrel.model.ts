import { Ship } from '../ship.model';

import { Crew, Gender } from '../../crew/crew.model';
import { Human } from '../../races/human/human.model';

import { Room } from '../../room/room.model';
import { Door, Engine, Medbay, Oxygen, Piloting, Sensor, Shield, WeaponControl } from '../../systems/index';

import { Weapon } from '../../weapon/weapon.model';

export class Kestrel extends Ship {
  constructor() {
    super();

    this.name = 'The Kestrel';
    this.layout = 'A';

    this.hull = this.maxHull = 300;
    this.reactorPower = 8;
    this.fuel = 16;
    this.missiles = 8;
    this.droneParts = 2;

    this.crews = [
      new Crew('Humain 1', new Human(), Gender.Male),
      new Crew('Humaine 2', new Human(), Gender.Female),
      new Crew('Humaine 3', new Human(), Gender.Female)
    ];

    this.rooms = [
      new Room(new Piloting(), this.crews[0]), // PilotingSymbol.png Piloting (1)
      new Room(new Door()), // DoorSystemSymbol.png Doors (1)
      new Room(new Sensor()), // SensorsSymbol.png Sensors (1)
      new Room(new Medbay()), // MedbaySymbol.png Medbay (1)
      new Room(new Oxygen()), // OxygenSymbol.png Oxygen (1)
      new Room(new Shield()), // ShieldsSymbol.png Shields (2)
      new Room(new Engine(), this.crews[1]), // EnginesSymbol.png Engines (2)
      new Room(new WeaponControl(), this.crews[2]) // WeaponControlSymbol.png Weapons (3)
    ];

    this.weapons = [
      new Weapon(), // Burst Laser II
      new Weapon() // Artemis Missiles
    ];

    // Capacities related
    this.maxSystemsAllowed = 14;
    this.maxWeaponsAllowed = 4;
    this.maxDronesAllowed = 2;
    this.maxCrewsAllowed = 6;
    this.maxUpgradesAllowed = 3;

    // Display related
    this.srcHullSprite = '/assets/images/ships/kestrel/layout_a/kestral_base.png';
    this.srcInteriorSprite = '/assets/images/ships/kestrel/layout_a/kestral_floor.png';
  }
}
