import { Injectable } from '@angular/core';

import { KestrelLayoutA, Ship } from '../../models/ships/index';

@Injectable({
  providedIn: 'root'
})
export class ShipsService {

  private ships: Ship[];

  constructor() {
    this.ships = [
      new KestrelLayoutA()
    ];
  }

  getShips(): Ship[]
  {
    return this.ships;
  }
}
