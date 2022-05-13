import { Race } from '../races/race.model';

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
}
