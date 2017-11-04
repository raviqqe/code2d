import { Store } from "redux";
import { call, put } from "redux-saga/effects";
import Immutable = require("seamless-immutable");
import { ImmutableObject } from "seamless-immutable";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import * as functions from "../lib/functions";
import { isSmallWindow, onTouchabilityChange, onWindowSizeChange, touchable } from "../lib/media";
import { takeEvery } from "./utils";

const actionCreator = actionCreatorFactory("ENVIRONMENT");

const setIsSmallWindow = actionCreator<boolean>("SET_IS_SMALL_WINDOW");
const setTouchable = actionCreator<boolean>("SET_TOUCHABLE");
const getCountry = actionCreator.async<void, string>("GET_COUNTRY");

export const actionCreators = {
    getCountry: () => getCountry.started(null),
};

export interface IState {
    country: string | null;
    isSmallWindow: boolean;
    touchable: boolean;
}

export const initialState: ImmutableObject<IState> = Immutable({
    country: null,
    isSmallWindow,
    touchable,
});

export const reducer = reducerWithInitialState(initialState)
    .case(getCountry.done, (state, { result }) => state.merge({ country: result }))
    .case(setIsSmallWindow, (state, isSmallWindow) => state.merge({ isSmallWindow }))
    .case(setTouchable, (state, touchable) => state.merge({ touchable }));

export const sagas = [
    takeEvery(
        getCountry.started,
        function* _() {
            yield put(getCountry.done({
                params: null,
                result: yield call(functions.call, "country"),
            }));
        }),
];

export function storeInitializer<A>(store: Store<A>): void {
    onWindowSizeChange((isSmallWindow) => store.dispatch(setIsSmallWindow(isSmallWindow)));
    onTouchabilityChange((touchable: boolean) => store.dispatch(setTouchable(touchable)));
}
