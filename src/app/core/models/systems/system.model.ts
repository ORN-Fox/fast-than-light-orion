import { v4 as uuidv4 } from 'uuid';

export class System {

  id: string;
  level: number;
  maxLevel: number;
  type: number;
  isInstalled: boolean;

  systemPosition: number | null;

  srcSystemGreenSprite: string;
  srcSystemOverlaySprite: string;

  srcSystemInRoomSprite: string;
  variantSystemInRoom: number;

  constructor() {
    this.id = uuidv4();
    this.level = 1;
    this.isInstalled = true;

    this.variantSystemInRoom = 0;
  }

  serializeForSave() {
    let system = {
      level: this.level,
      type: this.type,
      isInstalled: this.isInstalled,
      systemPosition: this.systemPosition,
      variantSystemInRoom: this.variantSystemInRoom
    };

    return system;
  }
}
