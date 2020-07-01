import { Angle } from "../units/Angle.js";
import { Vector } from "../units/Vector.js";
export class Transform {
    constructor(position = Vector.zero(), scale = Vector.one(), rotation = Angle.zero()) {
        this.origin = Vector.zero();
        this._parent = null;
        this.position = position;
        this.scale = scale;
        this.rotation = rotation;
    }
    /**
     * Vrátí dopočítanou pozici zděděnou od předků
     */
    getComputedPosition() {
        if (this._parent) {
            return this._parent.getComputedPosition().add(this.position);
        }
        else {
            return this.position.clone();
        }
    }
    /**
     * Vrátí dopočítanou škálu zděděnou od předků
     */
    getComputedScale() {
        if (this._parent) {
            return this._parent.getComputedScale().add(this.scale);
        }
        else {
            return this.scale.clone();
        }
    }
    /**
     * Vrátí dopočítanou rotaci zděděnou od rodičů
     */
    getComputedRotation() {
        if (this._parent) {
            return this._parent.getComputedRotation().add(this.rotation);
        }
        else {
            return this.rotation.clone();
        }
    }
    /**
     * @param parent Transformace rodiče
     * @param updateLocals Pokud bude TRUE, změní transformace tak, aby po parentování opticky identická
     */
    setParent(parent, updateLocals = false) {
        const oldPosition = this.getComputedPosition();
        const oldScale = this.getComputedScale();
        const oldRotation = this.getComputedRotation();
        this._parent = parent;
        if (updateLocals) {
            this.position.subtract(this.getComputedPosition().subtract(oldPosition));
            this.scale.subtract(this.getComputedScale().subtract(oldScale));
            this.rotation.subtract(this.getComputedRotation().subtract(oldRotation));
        }
    }
    clearParnet(updateLocals = false) {
        if (this._parent === null)
            return;
        const oldPosition = this.getComputedPosition();
        const oldScale = this.getComputedScale();
        const oldRotation = this.getComputedRotation();
        this._parent = null;
        if (updateLocals) {
            this.position.x = oldPosition.x;
            this.position.y = oldPosition.y;
            this.scale.x = oldScale.x;
            this.scale.y = oldScale.y;
            this.rotation.degrees = oldRotation.degrees;
        }
    }
    hasParent() {
        return this._parent !== null;
    }
    getParent() {
        if (this._parent == null) {
            throw new Error("Transform has no parent. You can test it by method `.hasParent()`");
        }
        return this._parent;
    }
}
