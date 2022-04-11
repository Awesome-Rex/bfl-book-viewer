import isReducer from "../HookDetection/isReducer";
import isRef from "../HookDetection/isRef";
import isState from "../HookDetection/isState";

export default function formatReducer(data: any) {
    if (isState(data)) return [...data]
    if (isRef(data)) return [data.current, (value: any) => data.current = value]
    if (isReducer(data)) return [...data]
}