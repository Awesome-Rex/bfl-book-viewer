import React from 'react'

// logic denotes function variable cannot be changed
export default function useFunction<T extends Function>(value: T) {
    return value;
}
