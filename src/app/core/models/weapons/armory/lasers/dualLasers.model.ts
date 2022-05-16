import { ProjectileWeapon } from '../../projectileWeapon.model';

export class DualLasers extends ProjectileWeapon {

  constructor() {
    super();

    this.name = "Dual Lasers";
    this.powerCost = 1;
    this.cost = 25;

    this.cooldown = 10;
    this.firingSpeed = 60;

    this.fire = 10;

    this.damagePerShot = 1;
    this.nbShots = 2;
  }
}
