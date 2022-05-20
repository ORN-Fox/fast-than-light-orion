import { System } from '../system.model';

export class Battery extends System {

  constructor(level: number = 1, isInstalled: boolean = true) {
    super();

    this.level = level;
    this.isInstalled = isInstalled;

    this.srcSystemGreenSprite = '/assets/images/gui/icons/green1/s_battery_green1.png';
    this.srcSystemOverlaySprite = '/assets/images/gui/icons/overlay/s_battery_overlay.png';

    this.srcSystemInRoomSprite = '/assets/images/ships/interior/battery/room_battery.png';
  }
}
