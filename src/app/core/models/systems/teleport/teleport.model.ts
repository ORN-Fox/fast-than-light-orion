import { System } from '../system.model';

export class Teleport extends System {

  constructor(level: number = 1, isInstalled: boolean = true) {
    super();

    this.level = level;
    this.isInstalled = isInstalled;

    this.srcSystemGreenSprite = '/assets/images/gui/icons/green1/s_teleporter_green1.png';
    this.srcSystemOverlaySprite = '/assets/images/gui/icons/overlay/s_teleporter_overlay.png';

    this.srcSystemInRoomSprite = '/assets/images/ships/interior/teleport/teleporter_off.png';
  }
}
