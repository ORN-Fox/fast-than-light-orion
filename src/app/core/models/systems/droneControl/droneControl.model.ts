import { SystemTypeEnum } from '../system-type.enum';
import { System } from '../system.model';

export class DroneControl extends System {

  constructor(level: number = 1, variantSystemInRoom: number = 0, isInstalled: boolean = true) {
    super();

    this.level = level;
    this.maxLevel = 4;
    this.type = SystemTypeEnum.DroneControl;
    this.isInstalled = isInstalled;

    this.srcSystemGreenSprite = '/assets/images/gui/icons/green1/s_drones_green1.png';
    this.srcSystemOverlaySprite = '/assets/images/gui/icons/overlay/s_drones_overlay.png';

    this.srcSystemInRoomSprite = `/assets/images/ships/interior/drones/room_drones${variantSystemInRoom == 0 ? '' : '_' + variantSystemInRoom}.png`;
  }
}
