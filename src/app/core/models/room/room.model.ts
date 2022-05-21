import { Crew } from '../crew/crew.model';
import { RoomDisplaySettings } from './roomDisplaySettings.model';
import { System } from '../systems/system.model';

export class Room {

  affectedCrew: Crew | null;
  affectedSystem: System | null;

  oxygen: number = 100;

  // diplay related
  roomDisplaySettings: RoomDisplaySettings;

  constructor(roomDisplaySettings: RoomDisplaySettings, system: System | null = null, crew: Crew | null = null) {
    this.affectedCrew = crew;
    this.affectedSystem = system;

    if (this.affectedCrew && !this.affectedCrew.race.needOxygen)
    {
      this.oxygen = 0;
    }

    // display related
    this.roomDisplaySettings = roomDisplaySettings;
  }
}
