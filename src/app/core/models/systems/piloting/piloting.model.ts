import { SystemPositionEnum } from '../system-position.enum';
import { SystemTypeEnum } from '../system-type.enum';
import { System } from '../system.model';

export class Piloting extends System {

  constructor(level: number = 1, systemPosition: number = SystemPositionEnum.Top, variantSystemInRoom: number = 0) {
    super();

    this.level = level;
    this.maxLevel = 3;
    this.type = SystemTypeEnum.Piloting;

    this.systemPosition = systemPosition;

    this.srcSystemGreenSprite = '/assets/images/gui/icons/green1/s_pilot_green1.png';
    this.srcSystemOverlaySprite = '/assets/images/gui/icons/overlay/s_pilot_overlay.png';

    this.srcSystemInRoomSprite = `/assets/images/ships/interior/pilot/room_pilot${variantSystemInRoom == 0 ? '' : '_' + variantSystemInRoom}.png`;
  }
}
