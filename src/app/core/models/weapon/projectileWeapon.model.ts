import { Weapon } from './weapon.model';

export class ProjectileWeapon extends Weapon {

  damagePerShot: number;
  nbShots: number = 1;
  flakSpeed: boolean = false;
  requireMissible: boolean = false;

  constructor() {
    super();
  }
}
