import { System } from '../system.model';

export class DroneControl extends System {

  constructor(level: number = 1, isInstalled: boolean = true) {
    super();

    this.level = level;
    this.isInstalled = isInstalled;

    this.srcSystemGreenSprite = '/assets/images/gui/icons/green1/s_drones_green1.png';
    this.srcSystemOverlaySprite = '/assets/images/gui/icons/overlay/s_drones_overlay.png';

    this.srcSystemInRoomSprite = '/assets/images/ships/interior/drones/room_drones.png';
  }
}
