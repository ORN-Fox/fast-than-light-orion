import { Crew } from '../crew/crew.model';
import { System } from '../systems/system.model';

export class Room {

  affectedCrew: Crew | null;
  affectedSystem: System;

  constructor(system: System, crew: Crew | null = null) {
    this.affectedCrew = crew;
    this.affectedSystem = system;
  }
}
