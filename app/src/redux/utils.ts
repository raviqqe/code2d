import { SagaIterator } from "redux-saga";
import * as effects from "redux-saga/effects";
import { Action, ActionCreator } from "typescript-fsa";

export function unwrapAction<P>(
    actionCreator: ActionCreator<P>,
    saga: (payload: P) => SagaIterator): (action: Action<P>) => SagaIterator {
    return (action: Action<P>) => {
        return saga(action.payload);
    };
}

export function* takeEvery<P>(actionCreator: ActionCreator<P>, saga: (payload: P) => SagaIterator): SagaIterator {
    return effects.takeEvery(actionCreator.type, unwrapAction(actionCreator, saga));
}