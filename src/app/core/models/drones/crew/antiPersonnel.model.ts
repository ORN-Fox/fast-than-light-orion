import { Drone } from '../drone.model';

export class AntiPersonnel extends Drone {
  constructor() {
    super();

    this.name = 'Anti-Personnel';
    this.powerCost = 2;
    this.cost = 35;

    this.health = this.maxHealth = 150;
  }
}
