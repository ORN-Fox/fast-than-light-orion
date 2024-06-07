export enum DifficultyEnum {
  Easy,
  Normal,
  Hard
}

export class Difficulty {

  name: string;
  value: number;
  scoreMultiplicator: number;

  constructor(name: string, value: number, scoreMultiplicator: number)
  {
    this.name = name;
    this.value = value;
    this.scoreMultiplicator = scoreMultiplicator;
  }

}
