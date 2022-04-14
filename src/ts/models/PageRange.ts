export default class {
    public get min () {
        return this._min;
    }
    public set min (value: number) {
        if (value <= this.max) {
            this._min = value;
        } else {
            this._min = this._max;
            this._max = value;
        }
    }
    public get max() {
        return this._max;
    }
    public set max (value: number) {
        if (value >= this.min) {
            this._max = value;
        } else {
            this._max = this._min;
            this._min = value;
        }
    }

    private _min!: number;
    private _max!:number;

    public lerp (point: number): number {
        return this.min + ((this.max - this.min) * point);
    }
    public between (point: number, inclusive: boolean = true): boolean {
        if (inclusive) return point >= this.min && point <= this.max;
        if (!inclusive) return point > this.min && point < this.max;
        return undefined!;
    }

    constructor (min: number = 0, max: number = 10) {
        this.min = min;
        this.max = max;
    }
}