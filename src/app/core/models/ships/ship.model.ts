import { Room } from '../room/room.model';
import { Weapon } from '../weapons/weapon.model';
import { Drone } from '../drone/drone.model';
import { Crew } from '../crew/crew.model';
import { Upgrade } from '../upgrade/upgrade.model';

export class Ship {

  name: string;
  originalName: string;
  layout: string;

  hull: number;
  reactorPower: number;
  fuel: number;
  missiles: number;
  droneParts: number;

  crews: Crew[] = [];
  rooms: Room[] = [];
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

  constructor()
  {
    this.maxSystemsAllowed = 14;
  }

  resetName()
  {
    this.name = this.originalName;
  }

}
