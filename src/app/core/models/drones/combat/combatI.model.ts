import { Drone } from '../drone.model';

export class CombatI extends Drone {
  constructor() {
    super();

    this.name = 'Combat I';
    this.powerCost = 2;
    this.cost = 50;

    this.fireSpeed = 15;
  }
}
