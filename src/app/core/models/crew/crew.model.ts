import { v4 as uuidv4 } from 'uuid';

import { SystemPositionEnum } from '../systems';

import { Race, RaceType } from '../races/race.model';

export enum Gender {
  Male = 1,
  Female,
  Other
}

export interface ISerializedCrew {
  id: string;
  name: string;
  raceType: number;
  gender: number;
}

export class Crew {

  id: string;
  name: string;
  race: Race;
  gender: number;

  // Skills related
  // TODO

  constructor(
    name: string,
    race: Race,
    gender: number
  ) {
    this.id = uuidv4();
    this.name = name;
    this.race = race;
    this.gender = gender;

    // Skills related
    // TODO
  }

  getFirstName(): string {
    return this.name.split(' ')[0];
  }

  getRaceNameWithGender(): string
  {
    if (this.race.type == RaceType.Human)
    {
      return `${this.race.name}-${this.gender == Gender.Male ? 'male' : 'female'}`;
    }

    return this.race.name;
  }

  getBaseSrc(): string {
    return `/assets/images/peoples/${this.getRaceNameWithGender()}/${this.getRaceNameWithGender()}_base-0.png`;
  }

  getAnimationNameForRoomAftectation(systemPosition: number | null): string {
    switch (systemPosition) {
      default:
      case SystemPositionEnum.Top:
        return "useComputer_Top";

      case SystemPositionEnum.Right:
        return "useComputer_Right";

      case SystemPositionEnum.Bottom:
        return "useComputer_Bottom";

      case SystemPositionEnum.Left:
        return "useComputer_Left";
    }
  }

  serializeForSave(): ISerializedCrew {
    let crew: ISerializedCrew = {
      id: this.id,
      name: this.name,
      raceType: this.race.type,
      gender: this.gender
    };

    return crew;
  }
}
