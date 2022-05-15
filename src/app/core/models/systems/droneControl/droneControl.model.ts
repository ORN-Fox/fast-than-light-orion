import { System } from '../system.model';

export class DroneControl extends System {

  constructor(level: number = 1) {
    super();

    this.level = level;

    this.srcSystemGreenSprite = '/assets/images/gui/icons/green1/s_drones_green1.png';
  }
}
