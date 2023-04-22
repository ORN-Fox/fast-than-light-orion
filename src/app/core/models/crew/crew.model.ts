import { v4 as uuidv4 } from 'uuid';

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

  getRaceNameWithGender(): string
  {
    if (this.race.type == RaceType.Human)
    {
      return `${this.race.name}-${this.gender == Gender.Male ? 'male' : 'female'}`;
    }

    return this.race.name;
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
