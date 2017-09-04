import Immutable = require("seamless-immutable");
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

const toggleTimer = actionCreatorFactory()("TOGGLE_TIMER");

export const actionCreators = { toggleTimer };

export const initialState = Immutable({ on: false });

export const reducer = reducerWithInitialState(initialState)
    .case(toggleTimer, (state) => state.merge({ on: !state.on }));
