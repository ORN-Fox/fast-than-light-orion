import { Race } from '../race.model';

export class Engi extends Race {

  constructor() {
    super();

    this.name = 'Engi';
    this.storeCost = 50;

    this.health = this.maximumHealth = 100;

    this.movementSpeeed = 1;
    this.repairSpeed = 2;
    this.combatDamage = .5;

    this.nbBlueOptions = 8;

    // TODO skills
  }
}