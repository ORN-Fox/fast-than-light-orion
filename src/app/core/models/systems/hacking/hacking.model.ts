import { System } from '../system.model';

export class Hacking extends System {

  constructor(level: number = 1, isInstalled: boolean = true) {
    super();

    this.level = level;
    this.isInstalled = isInstalled;

    this.srcSystemGreenSprite = '/assets/images/gui/icons/green1/s_hacking_green1.png';
    this.srcSystemOverlaySprite = '/assets/images/gui/icons/overlay/s_hacking_overlay.png';

    this.srcSystemInRoomSprite = '/assets/images/ships/interior/hacking/room_hacking.png';
  }
}
