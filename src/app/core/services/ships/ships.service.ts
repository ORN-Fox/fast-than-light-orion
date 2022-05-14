import { Injectable } from '@angular/core';

import { KestrelLayoutA, KestrelLayoutB, KestrelLayoutC, ShipList } from '../../models/ships/index';

@Injectable({
  providedIn: 'root'
})
export class ShipsService {

  private ships: ShipList[];

  constructor() {
    this.ships = [
      new ShipList('kestrel', [
        new KestrelLayoutA(),
        new KestrelLayoutB(),
        new KestrelLayoutC()
      ])
    ];
  }

  getShips(): ShipList[]
  {
    return this.ships;
  }
}
