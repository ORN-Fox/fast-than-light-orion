import { Injectable } from '@angular/core';

import { Kestrel, Ship } from '../../models/ships/index';

@Injectable({
  providedIn: 'root'
})
export class ShipsService {

  private ships: Ship[];

  constructor() {
    this.ships = [
      new Kestrel()
    ];
  }

  getShips(): Ship[]
  {
    return this.ships;
  }
}
