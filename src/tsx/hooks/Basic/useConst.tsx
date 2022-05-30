import React from 'react'

export default function useConst<T>(value: T) {
    const variable = value;

    return {
        get value() {
            return variable;
        }
    }
}
