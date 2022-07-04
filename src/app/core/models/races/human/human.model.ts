import { Race, RaceType } from '../race.model';

export class Human extends Race {

  constructor() {
    super();

    this.name = 'human';
    this.type = RaceType.Human;
    this.storeCost = 45;

    this.health = this.maximumHealth = 100;

    this.movementSpeeed = 1;
    this.repairSpeed = 1;
    this.combatDamage = 1;

    this.nbBlueOptions = 1;

    // TODO skills
  }
}
