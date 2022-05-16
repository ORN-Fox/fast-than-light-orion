import { ProjectileWeapon } from '../../projectileWeapon.model';

export class BasicLaser extends ProjectileWeapon {

  constructor() {
    super();

    this.name = "Basic Laser";
    this.powerCost = 1;
    this.cost = 20;

    this.cooldown = 10;
    this.firingSpeed = 60;

    this.fire = 10;

    this.damagePerShot = 1;
  }
}
