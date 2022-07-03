import { v4 as uuidv4 } from 'uuid';
import { TranslateService } from '@ngx-translate/core';

import { Race, RaceType } from '../races/race.model';

export enum Gender {
  Male = 1,
  Female,
  Other
}

export class Crew {

  id: string;
  name: string;
  race: Race;
  gender: number;

  // Skills related
  // TODO

  constructor(
    private translateService: TranslateService,
    race: Race,
    gender: number
  ) {
    this.id = uuidv4();
    this.name = this.getRandomName();
    this.race = race;
    this.gender = gender;

    // Skills related
    // TODO
  }

  getRandomName(): string
  {
    let randomNumber = Math.floor(Math.random() * 20);
    return this.translateService.instant(`commons.races.${this.getRaceNameWithGender()}.name-${randomNumber}`);
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
