import { useEffect, useState } from 'react';
import { BehaviorSubject } from 'rxjs';

// version 1.2.1

class SharedState {
    constructor(initialValue) {
        this._state = new BehaviorSubject(initialValue);
    }

    set state(values) {
        this._state.next(values);
    }

    get state() {
        return this._state
    }
}

function getSharedState(name) {
    window.globalStateHolder = window.globalStateHolder || {};
    if (!window.globalStateHolder[name]) {
        window.globalStateHolder[name] = new SharedState()

    }
    return window.globalStateHolder[name];
}

const useSharedState = (stateName, initialValue) => {

    const [sharedState, setSharedState] = useState(initialValue || getSharedState(stateName).state.value);

    useEffect(() => {
        const subscription = getSharedState(stateName).state.subscribe({
            next: state => {
                setSharedState(state)
            }
        })
        return () => {
            subscription.unsubscribe();
        }
    }, [])

    const sharedStateSetter = state => {
        getSharedState(stateName).state = state;
    }
    return [sharedState, sharedStateSetter];
}

export default useSharedState;
