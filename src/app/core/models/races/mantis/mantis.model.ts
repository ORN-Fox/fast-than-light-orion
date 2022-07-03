import { Race, RaceType } from '../race.model';

export class Mantis extends Race {

  constructor() {
    super();

    this.type = RaceType.Mantis;
    this.storeCost = 55;

    this.health = this.maximumHealth = 100;

    this.movementSpeeed = 1.2;
    this.repairSpeed = .5;
    this.combatDamage = 1.5;

    this.nbBlueOptions = 3;

    // TODO skills
  }
}
