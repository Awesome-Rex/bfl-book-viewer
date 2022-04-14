import isReducer from "../HookDetection/isReducer";
import isRef from "../HookDetection/isRef";
import isState from "../HookDetection/isState";
import HookFormat from "./HookFormat";

class RefFormat<T> extends HookFormat<T> {
    public get current() {
        return this._get();
    }
    public set current(value: any) {
        this._set(value);
    }
}

export default function formatRef(data: any) {
    if (isState(data)) return new RefFormat(() => data[0], (value: any) => data[1](value))
    if (isRef(data)) return new RefFormat(() => data.current, (value: any) => data.current = value)
    if (isReducer(data)) return new RefFormat(() => data[0], (value: any) => data[1](value))
}