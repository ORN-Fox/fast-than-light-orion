import { Race, RaceType } from '../race.model';

export class Slug extends Race {

  constructor() {
    super();

    this.name = 'Slug';
    this.type = RaceType.Slug;
    this.storeCost = 45;

    this.health = this.maximumHealth = 100;

    this.movementSpeeed = 1;
    this.repairSpeed = 1;
    this.combatDamage = 1;

    this.nbBlueOptions = 11;

    // TODO skills
  }
}
