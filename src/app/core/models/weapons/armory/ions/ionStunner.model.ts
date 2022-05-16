import { ProjectileWeapon } from '../../projectileWeapon.model';

export class IonStunner extends ProjectileWeapon {

  constructor() {
    super();

    this.name = "Ion Stunner";
    this.powerCost = 1;
    this.cost = 35;

    this.cooldown = 10;
    this.firingSpeed = 30;

    this.stun = 1;

    // this.damagePerShot = 1; // TODO 1 ion damage
    this.nbShots = 1;
  }
}
