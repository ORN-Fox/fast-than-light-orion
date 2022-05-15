import { System } from '../system.model';

export class CloneBay extends System {

  constructor(level: number = 1) {
    super();

    this.level = level;

    this.srcSystemGreenSprite = '/assets/images/gui/icons/green1/s_clonebay_green1.png';
  }
}
