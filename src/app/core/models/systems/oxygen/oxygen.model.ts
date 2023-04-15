import { SystemTypeEnum } from '../system-type.enum';
import { System } from '../system.model';

export class Oxygen extends System {

  constructor(level: number = 1, variantSystemInRoom: number = 0) {
    super();

    this.level = level;
    this.type = SystemTypeEnum.Oxygen;

    this.srcSystemGreenSprite = '/assets/images/gui/icons/green1/s_oxygen_green1.png';
    this.srcSystemOverlaySprite = '/assets/images/gui/icons/overlay/s_oxygen_overlay.png';

    this.srcSystemInRoomSprite = `/assets/images/ships/interior/oxygen/room_oxygen${variantSystemInRoom == 0 ? '' : '_' + variantSystemInRoom}.png`;
  }
}
