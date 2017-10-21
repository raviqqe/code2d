import Immutable = require("seamless-immutable");
import { ImmutableObject } from "seamless-immutable";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import { isSmallWindow } from "../lib/media";

const actionCreator = actionCreatorFactory("ENVIRONMENT");

const setIsSmallDevice = actionCreator<boolean>("SET_IS_SMALL_WINDOW");

export const actionCreators = { setIsSmallDevice };

export interface IState {
    isSmallWindow: boolean;
}

export const initialState: ImmutableObject<IState> = Immutable({ isSmallWindow });

export const reducer = reducerWithInitialState(initialState)
    .case(setIsSmallDevice, (state, isSmallWindow) => state.merge({ isSmallWindow }));
