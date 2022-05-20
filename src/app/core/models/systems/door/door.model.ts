import { System } from '../system.model';

export class Door extends System {

  constructor(level: number = 1) {
    super();

    this.level = level;

    this.srcSystemGreenSprite = '/assets/images/gui/icons/green1/s_doors_green1.png';
    this.srcSystemOverlaySprite = '/assets/images/gui/icons/overlay/s_doors_overlay.png';

    this.srcSystemInRoomSprite = '/assets/images/ships/interior/doors/room_doors.png';
  }
}
