import { ProjectileWeapon } from '../projectileWeapon.model';

export class DualLaser extends ProjectileWeapon {

  constructor() {
    super();

    this.name = "Dual Laser";
    this.powerCost = 1;
    this.cost = 25;

    this.cooldown = 10;
    this.firingSpeed = 60;

    this.fire = .1;

    this.damagePerShot = 1;
    this.nbShots = 2;
  }
}
