import { Race } from '../race.model';

export class Zoltan extends Race {

  constructor() {
    super();

    this.name = 'Rockmen';
    this.storeCost = 60;

    this.health = this.maximumHealth = 70;

    this.movementSpeeed = 1;
    this.repairSpeed = 1;
    this.combatDamage = 1;

    this.nbBlueOptions = 2;

    // TODO skills
  }
}
