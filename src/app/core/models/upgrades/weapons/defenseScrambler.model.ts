import { Upgrade } from '../upgrade.model';

export class DefenseScrambler extends Upgrade {
  constructor() {
    super();

    this.name = 'Defense Scrambler';
    this.cost = 80;
  }
}
