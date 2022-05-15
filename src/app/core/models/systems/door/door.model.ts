import { System } from '../system.model';

export class Door extends System {

  constructor(level: number = 1) {
    super();

    this.level = level;

    this.srcSystemGreenSprite = '/assets/images/gui/icons/green1/s_doors_green1.png';
  }
}
