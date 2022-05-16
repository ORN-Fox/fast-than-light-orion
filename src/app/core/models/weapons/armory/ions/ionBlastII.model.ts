import { ProjectileWeapon } from '../../projectileWeapon.model';

export class IonBlastII extends ProjectileWeapon {

  constructor() {
    super();

    this.name = "Ion Blast II";
    this.powerCost = 3;
    this.cost = 70;

    this.cooldown = 4;
    this.firingSpeed = 60;

    // this.damagePerShot = 1; // TODO 1 ion damage
    this.nbShots = 1;
  }
}
