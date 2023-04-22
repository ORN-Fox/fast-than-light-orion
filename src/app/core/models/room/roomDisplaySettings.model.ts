export const TILE_SIZE_WITH_BORDER: number = 35; // px
export const BORDER_TILE_SIZE: number = 2; // px

export interface ISerializedRoomDisplaySettings {
  x: number;
  y: number;
  sizeX: number;
  sizeY: number;
}

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
    this.height = this.sizeY * TILE_SIZE_WITH_BORDER;
    this.width = this.sizeX * TILE_SIZE_WITH_BORDER;
  }

  getRoomTilePositionX(): number {
    return this.x * TILE_SIZE_WITH_BORDER;
  }

  getRoomTilePositionY(): number {
    return this.y * TILE_SIZE_WITH_BORDER;
  }

  getRoomSystemIconPositionX(): number
  {
    return this.getRoomTilePositionX() + (this.sizeX > 1 ? 17.5 : 0); // system icon sprite : 35x35 -> 17.5px to center icon
  }

  getRoomSystemIconPositionY(): number
  {
    return this.getRoomTilePositionY() + (this.sizeY > 1 ? 17.5 : 0); // system icon sprite : 35x35 -> 17.5px to center icon
  }

  serializeForSave(): ISerializedRoomDisplaySettings {
    let roomDisplaySettings: ISerializedRoomDisplaySettings = {
      x: this.x,
      y: this.y,
      sizeX: this.sizeX,
      sizeY: this.sizeY
    };

    return roomDisplaySettings;
  }
}
