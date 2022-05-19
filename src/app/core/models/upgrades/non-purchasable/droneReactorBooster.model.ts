import { Upgrade } from '../upgrade.model';

export class DroneReactorBooster extends Upgrade {
  constructor() {
    super();

    this.name = 'Drone Reactor Booster';
    this.cost = 50;
  }
}
