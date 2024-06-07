export interface IShieldLevel {
    enabled: boolean;
    isHacked: boolean;
}

export class ShieldLevel {

    enabled: boolean;
    isHacked: boolean;

    constructor() {
        this.enabled = true;
        this.isHacked = false;
    }

    getSpriteSrc() {
        let shieldState = this.enabled ? 'on' : 'off';
        let shieldHacked = this.isHacked ? 'hacked_' : '';
        return `/assets/images/gui/status/top_shieldsquare1_${shieldHacked}${shieldState}.png`;
    }

    serializeForSave() {
        let serializeShieldLevel: IShieldLevel = {
            enabled: this.enabled,
            isHacked: this.isHacked
        };

        return serializeShieldLevel;
    }

    deserilizeFromSave(serializedShieldLevel: IShieldLevel) {
        this.enabled = serializedShieldLevel.enabled;
        this.isHacked = serializedShieldLevel.isHacked;
    }

}