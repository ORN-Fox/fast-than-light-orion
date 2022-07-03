import { Race, RaceType } from '../race.model';

export class Crystal extends Race {

  constructor() {
    super();

    this.type = RaceType.Crystal;
    this.storeCost = 60;

    this.health = this.maximumHealth = 125;

    this.movementSpeeed = .8;
    this.repairSpeed = 1;
    this.combatDamage = 1;

    this.nbBlueOptions = 3;

    // TODO skills
  }
}
