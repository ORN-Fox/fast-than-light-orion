export class Weapon {

  name: string;
  powerCost: number;
  cost: number;

  cooldown: number;
  firingSpeed: number;

  piercing: number = 0;
	fire: number = 0.0;
	breach: number = 0.0;
	stun: number = 0.0;

  constructor() {}

  getSellPrice() {
    Math.floor(this.cost / 2);
  }
}
