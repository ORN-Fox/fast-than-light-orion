import { Injectable } from '@angular/core';

import { Kestrel } from '../../models/ships/kestrel/kestrel.model';

@Injectable({
  providedIn: 'root'
})
export class ShipsService {

  ships: any[];

  constructor() {
    this.ships = [
      new Kestrel()
    ];
  }
}
