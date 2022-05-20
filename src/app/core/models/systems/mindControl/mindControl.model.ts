import { System } from '../system.model';

export class MindControl extends System {

  constructor(level: number = 1) {
    super();

    this.level = level;

    this.srcSystemGreenSprite = '/assets/images/gui/icons/green1/s_mind_green1.png';
    this.srcSystemOverlaySprite = '/assets/images/gui/icons/overlay/s_mind_overlay.png';

    this.srcSystemInRoomSprite = '/assets/images/ships/interior/mind/room_mind.png';
  }
}
