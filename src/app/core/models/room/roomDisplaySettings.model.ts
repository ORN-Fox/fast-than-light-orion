export const DEFAULT_TILE_HEIGHT: number = 33;
export const DEFAULT_TILE_WIDTH: number = 33;

export class RoomDisplaySettings
{
  x: number;
  y: number;
  sizeX: number;
  sizeY: number;
  height: number;
  width: number;

  constructor(x: number, y: number, sizeX: number, sizeY: number)
  {
    // Position X / Y
    this.x = x;
    this.y = y;

    // Nb tile X / Y
    this.sizeX = sizeX;
    this.sizeY = sizeY;

    // In pixels
    this.height = this.sizeY * DEFAULT_TILE_HEIGHT;
    this.width = this.sizeX * DEFAULT_TILE_WIDTH;
  }

  getRoomSystemIconPositionX(): number
  {
    return this.x + (this.sizeX > 1 ? 17 : 0); // system icon sprite : 32x32 -> 17px to center icon
  }

  getRoomSystemIconPositionY(): number
  {
    return this.y + (this.sizeY > 1 ? 17 : 0); // system icon sprite : 32x32 -> 17px to center icon
  }
}
