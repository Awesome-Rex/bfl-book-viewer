import isReducer from "../HookDetection/isReducer";
import isRef from "../HookDetection/isRef";
import isState from "../HookDetection/isState";
import HookFormat from "./hookFormat";

class CentralStateGetSet extends HookFormat {
    public get get() {
        return this._get();
    }
    public set set(value: any) {
        this._set(value);
    }
}

export default function formatCentralState(data: any) {
    if (isState(data)) return new CentralStateGetSet(() => data[0], (value: any) => data[1](value))
    if (isRef(data)) return new CentralStateGetSet(() => data.current, (value: any) => data.current = value)
    if (isReducer(data)) return new CentralStateGetSet(() => data[0], (value: any) => data[1](value))
}