import React from 'react'

export default function useLet<T>(value: T) {
    let variable = value;

    return {
        get value() {
            return variable;
        },
        set value(value) {
            variable = value;
        }
    }
}
