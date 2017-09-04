import Immutable = require("seamless-immutable");
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

const actionCreator = actionCreatorFactory("AUTH_STATE");

const signIn = actionCreator<null>("SIGN_IN");
const signOut = actionCreator<null>("SIGN_OUT");

export const actionCreators = {
    signIn: () => signIn(null),
    signOut: () => signOut(null),
};

export const initialState = Immutable({ signedIn: false });

export const reducer = reducerWithInitialState(initialState)
    .case(signIn, (state) => state.merge({ signedIn: true }))
    .case(signOut, (state) => state.merge({ signedIn: false }));
