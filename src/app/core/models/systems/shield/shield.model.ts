import { SystemPositionEnum } from '../system-position.enum';
import { System } from '../system.model';

export class Shield extends System {

  constructor(level: number = 1, systemPosition: number = SystemPositionEnum.Top, variantSystemInRoom: number = 0) {
    super();

    this.level = level;

    this.systemPosition = systemPosition;

    this.srcSystemGreenSprite = '/assets/images/gui/icons/green1/s_shields_green1.png';
    this.srcSystemOverlaySprite = '/assets/images/gui/icons/overlay/s_shields_overlay.png';

    this.srcSystemInRoomSprite = `/assets/images/ships/interior/shields/room_shields${variantSystemInRoom == 0 ? '' : '_' + variantSystemInRoom}.png`;
  }
}
