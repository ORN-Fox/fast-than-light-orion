import { ProjectileWeapon } from '../projectileWeapon.model';

export class BurstLaserII extends ProjectileWeapon {

  constructor() {
    super();

    this.name = "Burst Laser II";
    this.powerCost = 2;
    this.cost = 80;

    this.cooldown = 12;
    this.firingSpeed = 60;

    this.fire = .1;

    this.damagePerShot = 1;
    this.nbShots = 3;
  }
}
