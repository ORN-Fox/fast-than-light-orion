import { Injectable } from '@angular/core';

import { KestrelLayoutA, KestrelLayoutB, KestrelLayoutC, Ship } from '../../models/ships/index';

@Injectable({
  providedIn: 'root'
})
export class ShipsService {

  private ships: Ship[];

  constructor() {
    this.ships = [
      new KestrelLayoutA(),
      new KestrelLayoutB(),
      new KestrelLayoutC()
    ];
  }

  getShips(): Ship[]
  {
    return this.ships;
  }
}
