export class System {

  level: number;
  type: number;
  isInstalled: boolean;

  systemPosition: number | null;

  srcSystemGreenSprite: string;
  srcSystemOverlaySprite: string;

  srcSystemInRoomSprite: string;
  variantSystemInRoom: number;

  constructor() {
    this.level = 1;
    this.isInstalled = true;

    this.variantSystemInRoom = 0;
  }

}
