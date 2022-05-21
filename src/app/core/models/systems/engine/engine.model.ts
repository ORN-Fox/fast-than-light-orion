import { System } from '../system.model';

export class Engine extends System {

  constructor(level: number = 1, variantSystemInRoom: number = 0) {
    super();

    this.level = level;

    this.srcSystemGreenSprite = '/assets/images/gui/icons/green1/s_engines_green1.png';
    this.srcSystemOverlaySprite = '/assets/images/gui/icons/overlay/s_engines_overlay.png';

    this.srcSystemInRoomSprite = `/assets/images/ships/interior/engines/room_engines${variantSystemInRoom == 0 ? '' : '_' + variantSystemInRoom}.png`;
  }
}
