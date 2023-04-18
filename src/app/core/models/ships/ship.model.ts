import { Door } from '../door/door.model';
import { Room } from '../room/room.model';
import { Weapon } from '../weapons/weapon.model';
import { Drone } from '../drones/drone.model';
import { Crew } from '../crew/crew.model';
import { Upgrade } from '../upgrades/upgrade.model';

export enum ShipLayoutEnum {
  A = 'A',
  B = 'B',
  C = 'C'
}

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

  serializeForSave() {
    let serializeShip = {
      name: this.name,
      type: this.type,
      layout: this.layout,
      hull: this.hull,
      reactorPower: this.reactorPower,
      fuel: this.fuel,
      missiles: this.missiles,
      droneParts: this.droneParts,
      crews : this.crews.map(crew => crew.serializeForSave()),
      rooms: this.rooms.map(room => room.serializeForSave()),
      // TODO: continue serialisation for save weapons, drones and upgrades
      // weapons: this.weapons.map(weapon => weapon.id),
      // drones: this.drones.map(drone => drone.id),
      // upgrades: this.upgrades.map(upgrade => upgrade.id)
    };

    return serializeShip;
  }

}
