import { Injectable } from '@angular/core';

import { Crystal, Engi, Human, Lanius, Mantis, Race, RaceType, Rockmen, Slug, Zoltan } from '../../models/races/index';

@Injectable({
  providedIn: 'root'
})
export class AtlasesService {

  constructor() {}

  static getRace(raceType: number): Race {
    switch(raceType) {
        case RaceType.Crystal:
            return new Crystal();

        case RaceType.Engi:
            return new Engi();

        case RaceType.Human:
            return new Human();

        case RaceType.Lanius:
            return new Lanius();

        case RaceType.Mantis:
            return new Mantis();

        case RaceType.Rockmen:
            return new Rockmen();

        case RaceType.Slug:
            return new Slug();

        case RaceType.Zoltan:
            return new Zoltan();

        default:
            return new Race();
    }
  }
  
}
