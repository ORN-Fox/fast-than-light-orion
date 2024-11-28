import { Crew } from '../crew/crew.model';
import { Room } from '../room/room.model';

// Experimental
export class Slot {
  slotPositionX: number;
  slotPositionY: number;

  room: Room | null;
  crew: Crew | null;
  enemy: any; // TODO Manage enemny

  doors: any; // Manage doors : axes X/Y

  breach: boolean = false;
  fire: boolean = false;
  hacking: boolean = false;

  constructor(slotPositionX: number, slotPositionY: number, room: Room | null = null, crew: Crew | null = null) {
    this.slotPositionX = slotPositionX;
    this.slotPositionY = slotPositionY;

    this.room = room;

    if (this.room) {
      this.crew = crew;
    }
  }
}
