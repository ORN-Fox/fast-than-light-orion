export class Door
{
  x: number;
  y: number;
  rotation: number;
  level: number;

  constructor(x: number, y: number, rotation: number = 0, level: number = 1) {
    this.x = x;
    this.y = y;
    this.rotation = rotation;

    this.level = level;
  }

  getSrcDoorSprite()
  {
    return `/assets/images/effects/door_${this.level}.png`;
  }
}
