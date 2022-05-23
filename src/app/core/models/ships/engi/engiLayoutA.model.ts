import { EngiShip } from './engiShip.model';

import { Crew, Gender } from '../../crew/crew.model';
import { Engi, Human } from '../../races/index';

import { Door } from '../../door/door.model';
import { Room, RoomDisplaySettings } from '../../room/index';
import { Battery, Cloacking, DoorControl, DroneControl, Engine, Hacking, Medbay, MindControl, Oxygen, Piloting, Sensor, Shield, Teleport, WeaponControl } from '../../systems/index';

import { CombatI } from '../../drones/index';
import { EngiMedbotDispersal } from '../../upgrades/index';
import { IonBlastII } from '../../weapons/armory/ions/ionBlastII.model';

export class EngiLayoutA extends EngiShip {
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
      new Room(new RoomDisplaySettings(237, 230, 2, 2), new Shield(2, 4)),
      new Room(new RoomDisplaySettings(167, 230, 2, 2), new Engine(2, 2), this.crews[0]), // Engi
      new Room(new RoomDisplaySettings(237, 125, 1, 2), new Oxygen(1, 4)),
      new Room(new RoomDisplaySettings(379, 125, 2, 2), new WeaponControl(3), this.crews[1]), // Engi
      new Room(new RoomDisplaySettings(167, 91, 2, 2), new DroneControl(3)),
      new Room(new RoomDisplaySettings(378, 264, 2, 2), new Medbay()),
      new Room(new RoomDisplaySettings(448, 264, 1, 2), new Piloting(), this.crews[2]), // Human Male
      new Room(new RoomDisplaySettings(306, 194, 1, 2), new Sensor(1, 4)),
      new Room(new RoomDisplaySettings(306, 264, 1, 2), new DoorControl(1, 4)),
      new Room(new RoomDisplaySettings(200, 160, 1, 2), new Battery(1, 6, false)),
      new Room(new RoomDisplaySettings(273, 125, 2, 1), new Hacking(1, 2, false)), // Manage advancedEditionEnabled
      new Room(new RoomDisplaySettings(273, 88, 2, 1)), // Top of hacking room
      new Room(new RoomDisplaySettings(342, 92, 1, 2), new Cloacking(1, 4, false)),
      new Room(new RoomDisplaySettings(342, 230, 1, 2), new MindControl(1, 6, false)),
      new Room(new RoomDisplaySettings(378, 194, 1, 2), new Teleport(1, false)),
      new Room(new RoomDisplaySettings(415, 194, 1, 2)) // Right of teleport room
    ];

    this.doors = [
      new Door(234, 141, 90), // Bottom of drone control room
      new Door(218, 160), // Right of battery room
      new Door(234, 211, 90), // Top of engines room
      new Door(218, 262), // Right of engines room
      new Door(255, 124), // Right of oxygen room
      new Door(307, 70, 90), // Top left of top external door room
      new Door(340, 70, 90), // Top right of top external door room
      new Door(307, 106, 90), // Top left of top hacking room
      new Door(340, 106, 90), // Top right of top hacking room
      new Door(324, 124), // Right of hacking room
      new Door(360, 124), // Right of cloacking room
      new Door(288, 262), // Right of shields room
      new Door(340, 245, 90), // Top of door control room
      new Door(323, 228), // Right of sensor room
      new Door(360, 228), // Right top of mind control room
      new Door(360, 262), // Right bottom of mind control room
      new Door(412, 176, 90), // Bottom of weapons control room
      new Door(396, 192), // Right of teleport room
      new Door(412, 245, 90), // Bottom of teleport room
      new Door(432, 192), // Right Top of Right external doors room
      new Door(432, 228), // Right Bottom of Right external doors room
      new Door(429, 296) // Right of poiloting room
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
