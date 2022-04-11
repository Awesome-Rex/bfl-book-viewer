import { useEffect, useRef } from "react";

enum LifeCycleState {Mount, Update, Unmount}

export default function useLifecycle(mount: Function = () => {}, update: Function = () => {}, unmount: Function = () => {}) {
    const state = useRef(LifeCycleState.Mount);

    useEffect(() => {
        if (state.current == LifeCycleState.Mount) {
            mount();
            state.current = LifeCycleState.Update;
        } else if (state.current == LifeCycleState.Update) {
            update();
        }

        return () => {
            state.current = LifeCycleState.Unmount;
            unmount()
        };
    })
}