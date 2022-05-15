import { Injectable } from '@angular/core';

import { EngiLayoutA, EngiLayoutB, EngiLayoutC, KestrelLayoutA, KestrelLayoutB, KestrelLayoutC, ShipList } from '../../models/ships/index';

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
      ]),
      new ShipList('engi', [
        new EngiLayoutA(),
        new EngiLayoutB(),
        new EngiLayoutC(),
      ])
    ];
  }

  getShips(): ShipList[]
  {
    return this.ships;
  }
}
