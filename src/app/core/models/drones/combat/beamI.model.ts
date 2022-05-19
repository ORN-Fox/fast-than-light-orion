import { Drone } from '../drone.model';

export class BeamI extends Drone {
  constructor() {
    super();

    this.name = 'Beam I';
    this.powerCost = 2;
    this.cost = 50;

    this.fireSpeed = 15;
  }
}
