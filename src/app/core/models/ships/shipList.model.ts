import { Ship } from './ship.model';

export class ShipList {

  name: string;
  layouts: Ship[];

  constructor(name: string, layouts: Ship[] = [])
  {
    this.name = name;
    this.layouts = layouts;
  }

}
