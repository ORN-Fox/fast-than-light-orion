import { Race } from '../race.model';

export class Mantis extends Race {

  constructor() {
    super();

    this.name = 'Rockmen';
    this.storeCost = 55;

    this.health = this.maximumHealth = 150;

    this.movementSpeeed = .5;
    this.repairSpeed = 1;
    this.combatDamage = 1;

    this.nbBlueOptions = 6;

    // TODO skills
  }
}