import isReducer from "../HookDetection/isReducer";
import isRef from "../HookDetection/isRef";
import isState from "../HookDetection/isState";
import HookFormat from "./hookFormat";

class CentralStateFormat extends HookFormat {
    public get state() {
        return this._get();
    }
    public setState(value: any) {
        this._set(value);
    }
}

export default function formatCentralState(data: any) {
    if (isState(data)) return new CentralStateFormat(() => data[0], (value: any) => data[1](value))
    if (isRef(data)) return new CentralStateFormat(() => data.current, (value: any) => data.current = value)
    if (isReducer(data)) return new CentralStateFormat(() => data[0], (value: any) => data[1](value))
}