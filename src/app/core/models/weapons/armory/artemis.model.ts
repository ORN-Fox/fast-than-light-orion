import { ProjectileWeapon } from '../projectileWeapon.model';

export class Artemis extends ProjectileWeapon {

  constructor() {
    super();

    this.name = "Artemis";
    this.powerCost = 1;
    this.cost = 38;

    this.cooldown = 11;
    this.firingSpeed = 60; // Need to test missile firing speed

    this.piercing = .5
    this.fire = .1;
    this.breach = .1
    this.stun = .1;

    this.damagePerShot = 2;
    this.requireMissible = true;
  }
}
