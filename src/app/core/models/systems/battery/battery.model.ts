import { System } from '../system.model';

export class Battery extends System {

  constructor(level: number = 1) {
    super();

    this.level = level;

    this.srcSystemGreenSprite = '/assets/images/gui/icons/green1/s_battery_green1.png';
  }
}
