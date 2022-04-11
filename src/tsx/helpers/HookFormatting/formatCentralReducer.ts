import isReducer from "../HookDetection/isReducer";
import isRef from "../HookDetection/isRef";
import isState from "../HookDetection/isState";
import HookFormat from "./hookFormat";

class CentralStateReducer extends HookFormat {
    public get state() {
        return this._get();
    }
    public dispatch(value: any) {
        this._set(value);
    }
}

export default function formatCentralState(data: any) {
    if (isState(data)) return new CentralStateReducer(() => data[0], (value: any) => data[1](value))
    if (isRef(data)) return new CentralStateReducer(() => data.current, (value: any) => data.current = value)
    if (isReducer(data)) return new CentralStateReducer(() => data[0], (value: any) => data[1](value))
}