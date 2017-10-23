import { Store } from "redux";
import Immutable = require("seamless-immutable");
import { ImmutableObject } from "seamless-immutable";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import { isSmallWindow, onTouchabilityChange, onWindowSizeChange, touchable } from "../lib/media";

const actionCreator = actionCreatorFactory("ENVIRONMENT");

const setIsSmallWindow = actionCreator<boolean>("SET_IS_SMALL_WINDOW");
const setTouchable = actionCreator<boolean>("SET_TOUCHABLE");

export interface IState {
    isSmallWindow: boolean;
    touchable: boolean;
}

export const initialState: ImmutableObject<IState> = Immutable({ isSmallWindow, touchable });

export const reducer = reducerWithInitialState(initialState)
    .case(setIsSmallWindow, (state, isSmallWindow) => state.merge({ isSmallWindow }))
    .case(setTouchable, (state, touchable) => state.merge({ touchable }));

export function storeInitializer<A>(store: Store<A>): void {
    onWindowSizeChange((isSmallWindow) => store.dispatch(setIsSmallWindow(isSmallWindow)));
    onTouchabilityChange((touchable: boolean) => store.dispatch(setTouchable(touchable)));
}
