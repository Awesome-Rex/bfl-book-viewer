import React, { useCallback, useState } from 'react'

export default function useForceUpdate() {
    const [state, setState] = useState(0);

    return useCallback(() => setState(state => state + 1), [state]);
}