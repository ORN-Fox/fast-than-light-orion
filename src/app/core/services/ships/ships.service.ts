import { Injectable } from '@angular/core';
import { CrewsService } from '../crews/crews.service';

import { EngiLayoutA, EngiLayoutB, EngiLayoutC, KestrelLayoutA, KestrelLayoutB, KestrelLayoutC, ShipList } from '../../models/ships/index';

@Injectable({
  providedIn: 'root'
})
export class ShipsService {

  private ships: ShipList[];

  constructor(private crewsService: CrewsService) {
    this.ships = [
      new ShipList('kestrel', [
        new KestrelLayoutA(this.crewsService),
        new KestrelLayoutB(this.crewsService),
        new KestrelLayoutC(this.crewsService)
      ]),
      new ShipList('engi', [
        new EngiLayoutA(this.crewsService),
        new EngiLayoutB(this.crewsService),
        new EngiLayoutC(this.crewsService),
      ])
    ];
  }

  getShips(): ShipList[]
  {
    return this.ships;
  }
}
