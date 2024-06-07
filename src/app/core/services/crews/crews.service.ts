import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { NumberService } from '../../utils/number.service';

import { Crew, Gender } from '../../models/crew/crew.model';
import { Crystal,  Engi, Human, Lanius, Mantis, RaceType, Rockmen, Slug, Zoltan } from '../../models/races/index';

@Injectable({
  providedIn: 'root'
})
export class CrewsService {

  constructor(private translateService: TranslateService)
  {}

  createCrew(race: Crystal | Engi | Human | Lanius | Mantis | Rockmen | Slug | Zoltan, gender: number): Crew
  {
    return new Crew(this.getRandomName(race, gender), race, gender);
  }

  getRandomName(race: Crystal | Engi | Human | Lanius | Mantis | Rockmen | Slug | Zoltan, gender: number): string
  {
    let raceNameWithGender = race.name;

    if (race.type == RaceType.Human)
    {
      raceNameWithGender = `${raceNameWithGender}-${gender == Gender.Male ? 'male' : 'female'}`;
    }

    if (this.translateService.store) {
      return this.translateService.instant(`commons.races.${raceNameWithGender}.name-${NumberService.randomIntFromInterval(1, 20)}`);
    }
    return "loadingInProgress";
  }
}
