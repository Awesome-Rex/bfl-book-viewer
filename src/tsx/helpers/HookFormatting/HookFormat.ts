export default class HookFormat<T> {
    protected _get: () => T;
    protected _set: (value: T) => void;

    constructor(get: () => T, set: (value: T) => void) {
        this._get = get;
        this._set = set;
    }
}