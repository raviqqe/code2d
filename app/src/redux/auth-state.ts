import Immutable = require("seamless-immutable");
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

const actionCreator = actionCreatorFactory("AUTH_STATE");

const initialize = actionCreator("INITIALIZE");
const signIn = actionCreator("SIGN_IN");
const signOut = actionCreator("SIGN_OUT");

export const actionCreators = { initialize, signIn, signOut };

export const initialState = Immutable({ initialized: false, signedIn: false });

export const reducer = reducerWithInitialState(initialState)
    .case(initialize, (state) => state.merge({ initialized: true }))
    .case(signIn, (state) => state.merge({ signedIn: true }))
    .case(signOut, (state) => state.merge({ signedIn: false }));
