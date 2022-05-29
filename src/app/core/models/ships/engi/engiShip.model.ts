import { Ship } from '../ship.model';

export abstract class EngiShip extends Ship {
  constructor() {
    super();

    this.type = 'engi';
  }
}
