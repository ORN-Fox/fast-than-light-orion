export enum RaceType {
  Crystal = 1,
  Engi,
  Human,
  Lanius,
  Mantis,
  Rockmen,
  Slug,
  Zoltan
}

export class Race {

  name: string;
  type: number;
  storeCost: number;

  health: number;
  maximumHealth: number;

  movementSpeeed: number;
  repairSpeed: number;
  combatDamage: number;

  nbBlueOptions: number;

  needOxygen: boolean = true;

  // TODO skills

  constructor()
  {}
}
