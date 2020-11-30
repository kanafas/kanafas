import { IClonable } from "../core/IClonable.js";
import { Angle } from "../units/Angle.js";
import { Vector } from "../units/Vector.js";


export class Transform implements IClonable<Transform> {

    origin: Vector;
    position: Vector;
    scale: Vector;
    rotation: Angle;

    private _parent: Transform | null = null;


    constructor(position: Vector = Vector.zero, scale: Vector = Vector.one, rotation: Angle = Angle.zero, origin: Vector = Vector.zero) {
        this.position = position;
        this.scale = scale;
        this.rotation = rotation;
        this.origin = origin;
    }


    /**
     * Vrátí dopočítanou pozici zděděnou od předků
     */
    getComputedPosition(): Vector {
        if (this._parent) {
            return this._parent.getComputedPosition().add(this.position);
        } else {
            return this.position.clone();
        }
    }


    /**
     * Vrátí dopočítanou škálu zděděnou od předků
     */
    getComputedScale(): Vector {
        if (this._parent) {
            return this._parent.getComputedScale().add(this.scale);
        } else {
            return this.scale.clone();
        }
    }


    /**
     * Vrátí dopočítanou rotaci zděděnou od rodičů
     */
    getComputedRotation(): Angle {
        if (this._parent) {
            return this._parent.getComputedRotation().add(this.rotation);
        } else {
            return this.rotation.clone();
        }
    }


    /**
     * @param parent Transformace rodiče
     * @param updateLocals Pokud bude TRUE, změní transformace tak, aby po parentování opticky identická
     */
    setParent(parent: Transform, updateLocals: boolean = false) {
        const oldPosition: Vector = this.getComputedPosition();
        const oldScale: Vector = this.getComputedScale();
        const oldRotation: Angle = this.getComputedRotation();

        this._parent = parent;

        if (updateLocals) {
            this.position.subtract(this.getComputedPosition().subtract(oldPosition));
            this.scale.subtract(this.getComputedScale().subtract(oldScale));
            this.rotation.subtract(this.getComputedRotation().subtract(oldRotation));
        }
    }


    clearParnet(updateLocals: boolean = false) {
        if (this._parent === null) return;

        const oldPosition: Vector = this.getComputedPosition();
        const oldScale: Vector = this.getComputedScale();
        const oldRotation: Angle = this.getComputedRotation();

        this._parent = null;

        if (updateLocals) {
            this.position.x = oldPosition.x;
            this.position.y = oldPosition.y;

            this.scale.x = oldScale.x;
            this.scale.y = oldScale.y;

            this.rotation.degrees = oldRotation.degrees;
        }
    }


    hasParent(): boolean {
        return this._parent !== null;
    }


    getParent(): Transform {
        if (this._parent == null) {
            throw new Error("Transform has no parent. You can test by method `.hasParent()`");
        }

        return this._parent;
    }


    clone(): Transform {
        const t = new Transform(this.position.clone(), this.scale.clone(), this.rotation.clone(), this.origin.clone());

        if (this.hasParent()) t.setParent(t.getParent());

        return t;
    }

}