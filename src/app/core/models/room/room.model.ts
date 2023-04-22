import { Crew } from '../crew/crew.model';
import { ISerializedRoomDisplaySettings, RoomDisplaySettings } from './roomDisplaySettings.model';
import { System } from '../systems/system.model';

export interface ISerializedRoom {
  affectedCrewId: string | null;
  affectedSystemId: string | null;
  oxygen: number;
  roomDisplaySettings: ISerializedRoomDisplaySettings;
}

export class Room {

  affectedCrew: Crew | null;
  affectedSystem: System | null;

  oxygen: number = 100;

  // diplay related
  roomDisplaySettings: RoomDisplaySettings;

  // Sprites
  roomTile: any;
  noOxygenInRoomSprite: any;

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

  criticalOxygenLevel(): boolean
  {
    return this.oxygen <= 5;
  }

  getBackgroundColorForOxygenLevel(): number
  {
    if (this.oxygen >= 75)
    {
      return 0xe6e2db;
    }
    else if (this.oxygen >= 50)
    {
      return 0xe2cecc;
    }
    else if (this.oxygen >= 25)
    {
      return 0xe5bdb9;
    }
    else
    {
      return 0xfdb1a9;
    }
  }

  serializeForSave(): ISerializedRoom {
    let room: ISerializedRoom = {
      affectedCrewId: this.affectedCrew ? this.affectedCrew.id : null,
      affectedSystemId: this.affectedSystem ? this.affectedSystem.id : null,
      oxygen: this.oxygen,
      roomDisplaySettings: this.roomDisplaySettings.serializeForSave()
    };

    return room;
  }
}
