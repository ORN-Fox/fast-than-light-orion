import { System, SystemPositionEnum } from '../system.model';

export class DoorControl extends System {

  constructor(level: number = 1, systemPosition: number = SystemPositionEnum.Top, variantSystemInRoom: number = 0) {
    super();

    this.level = level;

    this.systemPosition = systemPosition;

    this.srcSystemGreenSprite = '/assets/images/gui/icons/green1/s_doors_green1.png';
    this.srcSystemOverlaySprite = '/assets/images/gui/icons/overlay/s_doors_overlay.png';

    this.srcSystemInRoomSprite = `/assets/images/ships/interior/doors/room_doors${variantSystemInRoom == 0 ? '' : '_' + variantSystemInRoom}.png`;
  }
}
