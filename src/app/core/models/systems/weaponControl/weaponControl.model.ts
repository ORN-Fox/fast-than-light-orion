import { SystemPositionEnum } from '../system-position.enum';
import { SystemTypeEnum } from '../system-type.enum';
import { System } from '../system.model';

export class WeaponControl extends System {

  constructor(level: number = 1, systemPosition: number = SystemPositionEnum.Top, variantSystemInRoom: number = 0) {
    super();

    this.level = level;
    this.maxLevel = 8;
    this.type = SystemTypeEnum.WeaponControl;

    this.systemPosition = systemPosition;

    this.srcSystemGreenSprite = '/assets/images/gui/icons/green1/s_weapons_green1.png';
    this.srcSystemOverlaySprite = '/assets/images/gui/icons/overlay/s_weapons_overlay.png';

    this.srcSystemInRoomSprite = `/assets/images/ships/interior/weapons/room_weapons${variantSystemInRoom == 0 ? '' : '_' + variantSystemInRoom}.png`;
  }
}
