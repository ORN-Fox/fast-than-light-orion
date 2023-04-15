import { SystemTypeEnum } from '../system-type.enum';
import { System } from '../system.model';

export class Cloacking extends System {

  constructor(level: number = 1, variantSystemInRoom: number = 0, isInstalled: boolean = true) {
    super();

    this.level = level;
    this.type = SystemTypeEnum.Cloacking;
    this.isInstalled = isInstalled;

    this.srcSystemGreenSprite = '/assets/images/gui/icons/green1/s_cloaking_green1.png';
    this.srcSystemOverlaySprite = '/assets/images/gui/icons/overlay/s_cloaking_overlay.png';

    this.srcSystemInRoomSprite = `/assets/images/ships/interior/cloaking/room_cloaking${variantSystemInRoom == 0 ? '' : '_' + variantSystemInRoom}.png`;
  }
}
