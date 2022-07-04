import { Race, RaceType } from '../race.model';

export class Rockmen extends Race {

  constructor() {
    super();

    this.name = 'rockmen';
    this.type = RaceType.Rockmen;
    this.storeCost = 55;

    this.health = this.maximumHealth = 150;

    this.movementSpeeed = .5;
    this.repairSpeed = 1;
    this.combatDamage = 1;

    this.nbBlueOptions = 6;

    // TODO skills
  }
}
