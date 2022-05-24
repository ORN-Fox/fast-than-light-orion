import { Race, RaceType } from '../races/race.model';

export enum Gender {
  Male = 1,
  Female,
  Other
}

export class Crew {

  name: string;
  race: Race;
  gender: number;

  // Skills related
  // TODO

  constructor(name: string, race: Race, gender: number) {
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
}
