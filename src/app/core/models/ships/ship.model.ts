import { Door } from '../door/door.model';
import { Room } from '../room/room.model';
import { Weapon } from '../weapons/weapon.model';
import { Drone } from '../drones/drone.model';
import { Crew } from '../crew/crew.model';
import { Upgrade } from '../upgrades/upgrade.model';

export class Ship {

  name: string;
  originalName: string;
  type: string;
  layout: string;

  hull: number;
  reactorPower: number;
  fuel: number;
  missiles: number;
  droneParts: number;

  crews: Crew[] = [];
  rooms: Room[] = [];
  doors: Door[] = [];
  weapons: Weapon[] = [];
  drones: Drone[] = [];
  upgrades: Upgrade[] = [];

  // Capacities related
  maxHull: number;
  maxSystemsAllowed: number;
  maxWeaponsAllowed: number;
  maxDronesAllowed: number;
  maxCrewsAllowed: number;
  maxUpgradesAllowed: number;

  // Display related
  srcHullSprite: string
  srcInteriorSprite: string;

  // Shed display related
  hullSpriteX: number;
  hullSpriteY: number;
  interiorSpriteX: number;
  interiorSpriteY: number;

  // Experimental
  shipRepresentation: any;

  constructor()
  {
    this.maxSystemsAllowed = 14;
  }

  resetName()
  {
    this.name = this.originalName;
  }

}
