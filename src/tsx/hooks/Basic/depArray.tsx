import React from 'react'

// converts array into usable dependency
// usable on useEffect, useLayoutEffect, useMemo, useCallback,...
// complex array elements can be compressed into simpler forms (e.g. ID)
export default function depArray<T>(arr: Array<T>, compress?: (elem: T) => any) {
    if (compress == undefined) return JSON.stringify(arr);
    else return JSON.stringify(arr.map(elem => compress(elem)));
}
