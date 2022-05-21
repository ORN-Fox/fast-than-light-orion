import { System } from '../system.model';

export class CloneBay extends System {

  constructor(level: number = 1, isInstalled: boolean = true) {
    super();

    this.level = level;
    this.isInstalled = isInstalled;

    this.srcSystemGreenSprite = '/assets/images/gui/icons/green1/s_clonebay_green1.png';
    this.srcSystemOverlaySprite = '/assets/images/gui/icons/overlay/s_clonebay_overlay.png';

    this.srcSystemInRoomSprite = '/assets/images/ships/interior/clonebay/clone_top.png';
  }
}
