import { System } from '../system.model';

export class Cloacking extends System {

  constructor(level: number = 1) {
    super();

    this.level = level;

    this.srcSystemGreenSprite = '/assets/images/gui/icons/green1/s_cloaking_green1.png';
    this.srcSystemOverlaySprite = '/assets/images/gui/icons/overlay/s_cloaking_overlay.png';

    this.srcSystemInRoomSprite = '/assets/images/ships/interior/cloaking/room_cloaking.png';
  }
}
