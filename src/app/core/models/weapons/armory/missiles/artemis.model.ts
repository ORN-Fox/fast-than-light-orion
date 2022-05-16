import { ProjectileWeapon } from '../../projectileWeapon.model';

export class Artemis extends ProjectileWeapon {

  constructor() {
    super();

    this.name = "Artemis";
    this.powerCost = 1;
    this.cost = 38;

    this.cooldown = 11;
    this.firingSpeed = 35;

    this.piercing = .5;
    this.fire = 10;
    this.breach = 9;
    this.stun = .1;

    this.damagePerShot = 2;
    this.requireMissible = true;
  }
}
