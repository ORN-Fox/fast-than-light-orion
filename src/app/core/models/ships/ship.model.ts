import { Door } from '../door/door.model';
import { Weapon } from '../weapons/weapon.model';
import { Drone } from '../drones/drone.model';
import { Crew, ISerializedCrew } from '../crew/crew.model';
import { ISerializedRoom, Room } from '../room/room.model';
import { RoomDisplaySettings } from '../room';
import { Race } from '../races';
import { IShieldLevel, ShieldLevel } from '../shield-level/shield-level.model';
import { Upgrade } from '../upgrades/upgrade.model';

export enum ShipLayoutEnum {
  A = 'A',
  B = 'B',
  C = 'C'
}

export interface ISerializedShip {
  name: string;
  type: string;
  layout: string;
  hull: number;
  shields: IShieldLevel[];
  reactorPower: number;
  fuel: number;
  missiles: number;
  droneParts: number;
  crews: ISerializedCrew[];
  rooms: ISerializedRoom[];
  // TODO: continue serialisation for save weapons, drones and upgrades
  // weapons: SerializedWeapons;
  // drones: SerializedDrones,
  // upgrades: SerializedUpgrades
}

export class Ship {

  name: string;
  originalName: string;
  type: string;
  layout: string;

  hull: number;
  shields: ShieldLevel[];
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
    this.shields = [
      new ShieldLevel()
    ];

    this.maxSystemsAllowed = 14;
  }

  resetName()
  {
    this.name = this.originalName;
  }

  serializeForSave(): ISerializedShip {
    let serializeShip: ISerializedShip = {
      name: this.name,
      type: this.type,
      layout: this.layout,
      hull: this.hull,
      shields: this.shields.map(shield => shield.serializeForSave()),
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

  deserilizeFromSave(serializedShip: ISerializedShip) {
    this.name = serializedShip.name;

    this.shields = serializedShip.shields.map(serializedShield => {
      let shieldLevel = new ShieldLevel();
      shieldLevel.deserilizeFromSave(serializedShield);
      return shieldLevel;
    });

    this.reactorPower = serializedShip.reactorPower;
    this.fuel = serializedShip.fuel;
    this.missiles = serializedShip.missiles;
    this.droneParts = serializedShip.droneParts;

    this.crews = serializedShip.crews.map(serializedCrew => {
      let crew = new Crew('', new Race(), 0);
      crew.deserilizeFromSave(serializedCrew);
      return crew;
    });

    this.rooms = serializedShip.rooms.map(serializedRoom => {
      let room = new Room(new RoomDisplaySettings(0, 0, 0, 0));
      room.deserilizeFromSave(serializedRoom, this.crews);
      return room;
    });

    // TODO: continue deserialisation from save weapons, drones and upgrades
    //weapons: Weapon[] = [];
    // drones: Drone[] = [];
    // upgrades: Upgrade[] = [];
  }

}
