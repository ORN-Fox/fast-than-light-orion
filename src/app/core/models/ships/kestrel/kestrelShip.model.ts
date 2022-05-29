import { Ship } from '../ship.model';

export abstract class KestrelShip extends Ship {
  constructor() {
    super();

    this.type = 'kestrel';
  }
}
