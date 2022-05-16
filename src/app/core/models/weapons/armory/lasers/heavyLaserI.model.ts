import { ProjectileWeapon } from '../../projectileWeapon.model';

export class HeavyLaserI extends ProjectileWeapon {

  constructor() {
    super();

    this.name = "Heavy Laser I";
    this.powerCost = 1;
    this.cost = 50;

    this.cooldown = 9;
    this.firingSpeed = 60;

    this.fire = 30;
    this.breach = 21;
    this.stun = 0;

    this.damagePerShot = 2;
    this.nbShots = 1;
  }
}
