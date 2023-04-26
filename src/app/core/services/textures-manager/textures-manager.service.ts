import { Loader, Spritesheet } from 'pixi.js';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TexturesManagerService {

  constructor() {}

  loadRacesSpritesheets(callbackFunction: any)
  {
    Loader.shared
      .add("/assets/images/effects/thrusters_on.json")
      .add("/assets/images/peoples/crystal/crystal-base-spritesheet.json")
      .add("/assets/images/peoples/engi/engi-base-spritesheet.json")
      .add("/assets/images/peoples/human-female/human-female-base-spritesheet.json")
      .add("/assets/images/peoples/human-male/human-male-base-spritesheet.json")
      .add("/assets/images/peoples/lanius/lanius-base-spritesheet.json")
      .add("/assets/images/peoples/mantis/mantis-base-spritesheet.json")
      .add("/assets/images/peoples/rockmen/rockmen-base-spritesheet.json")
      .add("/assets/images/peoples/slug/slug-base-spritesheet.json")
      .add("/assets/images/peoples/zoltan/zoltan-base-spritesheet.json")
      .load(callbackFunction);
  }

  getRaceSheetForRace(name: string): Spritesheet
  {
    switch (name)
    {
      case 'crystal':
        return Loader.shared.resources["/assets/images/peoples/crystal/crystal-base-spritesheet.json"].spritesheet as Spritesheet;

      case 'engi':
        return Loader.shared.resources["/assets/images/peoples/engi/engi-base-spritesheet.json"].spritesheet as Spritesheet;

      case 'human-female':
        return Loader.shared.resources["/assets/images/peoples/human-female/human-female-base-spritesheet.json"].spritesheet as Spritesheet;

      default:
      case 'human-male':
        return Loader.shared.resources["/assets/images/peoples/human-male/human-male-base-spritesheet.json"].spritesheet as Spritesheet;

      case 'lanius':
        return Loader.shared.resources["/assets/images/peoples/lanius/lanius-base-spritesheet.json"].spritesheet as Spritesheet;

      case 'mantis':
        return Loader.shared.resources["/assets/images/peoples/mantis/mantis-base-spritesheet.json"].spritesheet as Spritesheet;

      case 'rockmen':
        return Loader.shared.resources["/assets/images/peoples/rockmen/rockmen-base-spritesheet.json"].spritesheet as Spritesheet;

      case 'slug':
        return Loader.shared.resources["/assets/images/peoples/slug/slug-base-spritesheet.json"].spritesheet as Spritesheet;

      case 'zoltan':
        return Loader.shared.resources["/assets/images/peoples/zoltan/zoltan-base-spritesheet.json"].spritesheet as Spritesheet;
    }
  }
}
