export enum SystemPositionEnum {
  Left = 1,
  Top,
  Right,
  Bottom
}

export class System {

  level: number = 1;
  isInstalled: boolean = true;

  systemPosition: number | null;

  srcSystemGreenSprite: string;
  srcSystemOverlaySprite: string;

  srcSystemInRoomSprite: string;
  variantSystemInRoom: number = 0;

  constructor() {}
}
