declare var PIXI: any;

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TexturesManagerService {

  constructor() {}

  loadRacesSpritesheets(callbackFunction: Function)
  {
    PIXI.Loader.shared
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

  getRaceSheetForRace(name: string)
  {
    switch (name)
    {
      case 'crystal':
        return PIXI.Loader.shared.resources["/assets/images/peoples/crystal/crystal-base-spritesheet.json"].spritesheet;

      case 'engi':
        return PIXI.Loader.shared.resources["/assets/images/peoples/engi/engi-base-spritesheet.json"].spritesheet;

      case 'human-female':
        return PIXI.Loader.shared.resources["/assets/images/peoples/human-female/human-female-base-spritesheet.json"].spritesheet;

      case 'human-male':
        return PIXI.Loader.shared.resources["/assets/images/peoples/human-male/human-male-base-spritesheet.json"].spritesheet;

      case 'lanius':
        return PIXI.Loader.shared.resources["/assets/images/peoples/lanius/lanius-base-spritesheet.json"].spritesheet;

      case 'mantis':
        return PIXI.Loader.shared.resources["/assets/images/peoples/mantis/mantis-base-spritesheet.json"].spritesheet;

      case 'rockmen':
        return PIXI.Loader.shared.resources["/assets/images/peoples/rockmen/rockmen-base-spritesheet.json"].spritesheet;

      case 'slug':
        return PIXI.Loader.shared.resources["/assets/images/peoples/slug/slug-base-spritesheet.json"].spritesheet;

      case 'zoltan':
        return PIXI.Loader.shared.resources["/assets/images/peoples/zoltan/zoltan-base-spritesheet.json"].spritesheet;
    }
  }
}
