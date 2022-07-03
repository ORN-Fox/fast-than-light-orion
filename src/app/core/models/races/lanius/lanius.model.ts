import { Race, RaceType } from '../race.model';

export class Lanius extends Race {

  constructor() {
    super();

    this.type = RaceType.Lanius;
    this.storeCost = 50;

    this.health = this.maximumHealth = 100;

    this.movementSpeeed = .85;
    this.repairSpeed = 1;
    this.combatDamage = 1;

    this.nbBlueOptions = 11;

    this.needOxygen = false;

    // TODO skills
  }
}
