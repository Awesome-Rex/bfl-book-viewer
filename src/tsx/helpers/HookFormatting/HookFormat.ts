export default class HookFormat {
    protected _get;
    protected _set;

    constructor(get: () => any, set: (value: any) => void) {
        this._get = get;
        this._set = set;
    }
}