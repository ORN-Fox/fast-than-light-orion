import { Ship } from '../ship.model';

export class Kestrel extends Ship {
  constructor() {
    super();

    this.name = 'The Kestrel';
    this.layout = 'A';

    this.hull = 300;
    this.reactorPower = 8;
    this.fuel = 16;
    this.missiles = 8;
    this.droneParts = 2;

    this.crews = [
      // new Human(),
      // new Human(),
      // new Human()
    ];

    this.rooms = [
      // PilotingSymbol.png Piloting (1)
      // DoorSystemSymbol.png Doors (1)
      // SensorsSymbol.png Sensors (1)
      // MedbaySymbol.png Medbay (1)
      // OxygenSymbol.png Oxygen (1)
      // ShieldsSymbol.png Shields (2)
      // EnginesSymbol.png Engines (2)
      // WeaponControlSymbol.png Weapons (3)
    ];

    this.weapons = [
      // Burst Laser II
      // Artemis Missiles
    ];
  }
}
