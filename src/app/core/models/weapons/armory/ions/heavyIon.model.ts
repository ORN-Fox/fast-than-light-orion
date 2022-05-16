import { ProjectileWeapon } from '../../projectileWeapon.model';

export class HeavyIon extends ProjectileWeapon {

  constructor() {
    super();

    this.name = "Heavy Ion";
    this.powerCost = 2;
    this.cost = 45;

    this.cooldown = 13;
    this.firingSpeed = 40;

    this.stun = .2;

    // this.damagePerShot = 2; // TODO 2 ion damage
    this.nbShots = 1;
  }
}
