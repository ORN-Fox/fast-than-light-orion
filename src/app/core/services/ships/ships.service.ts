import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash';

import { CrewsService } from '../crews/crews.service';

import { EngiLayoutA, EngiLayoutB, EngiLayoutC, KestrelLayoutA, KestrelLayoutB, KestrelLayoutC, Ship, ShipList } from '../../models/ships/index';

@Injectable({
  providedIn: 'root'
})
export class ShipsService {

  private shipsList: ShipList[];

  constructor(private crewsService: CrewsService) {
    this.shipsList = [
      new ShipList('kestrel', [
        new KestrelLayoutA(this.crewsService),
        new KestrelLayoutB(this.crewsService),
        new KestrelLayoutC(this.crewsService)
      ]),
      new ShipList('engi', [
        new EngiLayoutA(this.crewsService),
        new EngiLayoutB(this.crewsService),
        new EngiLayoutC(this.crewsService)
      ])
    ];
  }

  getShips(): ShipList[] {
    return this.shipsList;
  }

  getShip(type: string, layout: string): Ship | null {
    for (let shipList of this.shipsList) {
      if (shipList.name == type) {
        let ships = shipList.layouts.filter(ship => ship.layout == layout);
        return ships.length > 0 ? cloneDeep(ships[0]) : null;
      }
    }
    return null;
  }

}
