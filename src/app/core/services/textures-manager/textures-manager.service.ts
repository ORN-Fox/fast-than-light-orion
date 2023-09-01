import { Assets, ResolverManifest, Spritesheet } from 'pixi.js';
import { Injectable, Optional, SkipSelf } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TexturesManagerService {

  // racesSpritsheetBundle: any;

  constructor(
    @Optional() @SkipSelf() parentModule?: TexturesManagerService
  ) {
    if (parentModule) {
      throw new Error('TexturesManagerService is already loaded. Import it in the AppModule only');
    }
  }

  async init() {
    this.loadManifest();
  }

  // Get functions

  getSpritesheet(name: string): Spritesheet {
    return Assets.cache.get(name);
  }

  // Private functions

  private async loadManifest() {
    const manifest: ResolverManifest = {
      bundles: [
        {
          name: 'races-spritesheets',
          assets: [
            { name: 'crystal', srcs: '/assets/images/peoples/crystal/crystal-base-spritesheet.json' },
            { name: 'engi', srcs: '/assets/images/peoples/engi/engi-base-spritesheet.json' },
            { name: 'human-female', srcs: '/assets/images/peoples/human-female/human-female-base-spritesheet.json' },
            { name: 'human-male', srcs: '/assets/images/peoples/human-male/human-male-base-spritesheet.json' },
            { name: 'lanius', srcs: '/assets/images/peoples/lanius/lanius-base-spritesheet.json' },
            { name: 'mantis', srcs: '/assets/images/peoples/mantis/mantis-base-spritesheet.json' },
            { name: 'rockmen', srcs: '/assets/images/peoples/rockmen/rockmen-base-spritesheet.json' },
            { name: 'slug', srcs: '/assets/images/peoples/slug/slug-base-spritesheet.json' },
            { name: 'zoltan', srcs: '/assets/images/peoples/zoltan/zoltan-base-spritesheet.json' }
          ]
        }
      ]
    };

    await Assets.init({ manifest });
    console.debug('TextureManager init');

    // Load assets bundles
    await Assets.loadBundle('races-spritesheets');
    console.debug('All bundles is loaded', Assets.cache);
  }
}
