export class PageRange {
    public get min () {
        return this._min;
    }
    public set min (value: number) {
        //if (value <= this.max) {
        this._min = value;
        // } else {
        //     this._min = this._max;
        //     this._max = value;
        // }
    }
    public get max() {
        return this._max;
    }
    public set max (value: number) {
        // if (value >= this.min) {
        this._max = value;
        // } else {
        //     this._max = this._min;
        //     this._min = value;
        // }
    }

    private _min!: number;
    private _max!:number;

    public progressToPoint (progress: number): number { // progress to page
        return this.min + ((this.max - this.min) * progress);
    }
    public pointToProgress (point: number): number { // page to progress
        return (point - this.min) / (this.max - this.min);
    }
    public between (point: number, inclusive: boolean = true): boolean {
        if (inclusive) return point >= this.min && point <= this.max;
        if (!inclusive) return point > this.min && point < this.max;
        return undefined!;
    }
    public clamp (point: number): number {
        if (point < this.min) return this.min;
        if (point > this.max) return this.max;
        return point;
    }

    constructor (min: number = 0, max: number = 10) {
        this.min = min;
        this.max = max;
    }
}