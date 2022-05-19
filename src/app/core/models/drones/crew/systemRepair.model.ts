import { Drone } from '../drone.model';

export class SystemRepair extends Drone {
  constructor() {
    super();

    this.name = 'System Repair';
    this.powerCost = 1;
    this.cost = 30;
  }
}
