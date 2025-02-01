import { SystemPositionEnum } from '../system-position.enum';
import { SystemTypeEnum } from '../system-type.enum';
import { System } from '../system.model';

export class Sensor extends System {

  constructor(level: number = 1, systemPosition: number = SystemPositionEnum.Top, variantSystemInRoom: number = 0, isInstalled: boolean = true) {
    super();

    this.level = level;
    this.maxLevel = 3;
    this.type = SystemTypeEnum.Sensor;
    this.isInstalled = isInstalled;

    this.systemPosition = systemPosition;

    this.srcSystemGreenSprite = '/assets/images/gui/icons/green1/s_sensors_green1.png';
    this.srcSystemOverlaySprite = '/assets/images/gui/icons/overlay/s_sensors_overlay.png';

    this.srcSystemInRoomSprite = `/assets/images/ships/interior/sensors/room_sensors${variantSystemInRoom == 0 ? '' : '_' + variantSystemInRoom}.png`;
  }
}
