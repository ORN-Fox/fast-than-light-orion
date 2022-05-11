import { Room } from '../room/room.model';
import { Weapon } from '../weapon/weapon.model';
import { Drone } from '../drone/drone.model';
import { Character } from '../character/character.model';

export class Ship {

  amor: number;
  shield: number;

  rooms: Room[] = [];
  weapons: Weapon[] = [];
  drones: Drone[] = [];
  crew: Character[] = [];

  constructor() {

  }
}
