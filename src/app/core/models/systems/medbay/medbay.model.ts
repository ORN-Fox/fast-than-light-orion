import { System } from '../system.model';

export class Medbay extends System {

  constructor(level: number = 1, variantSystemInRoom: number = 0) {
    super();

    this.level = level;

    this.srcSystemGreenSprite = '/assets/images/gui/icons/green1/s_medbay_green1.png';
    this.srcSystemOverlaySprite = '/assets/images/gui/icons/overlay/s_medbay_overlay.png';

    this.srcSystemInRoomSprite = `/assets/images/ships/interior/medbay/room_medbay${variantSystemInRoom == 0 ? '' : '_' + variantSystemInRoom}.png`;
  }
}
