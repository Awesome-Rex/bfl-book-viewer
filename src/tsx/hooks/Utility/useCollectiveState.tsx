import React, { useState } from "react";

export interface CollectiveState {

}

export default function useCollectiveState<T>() { // reduces multiple sub component states into 1 (similar to Array.reduce())
    const dict = useState<{any: T}>();

    
}
