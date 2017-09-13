import Immutable = require("seamless-immutable");
import { ImmutableObject } from "seamless-immutable";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

const actionCreator = actionCreatorFactory("AUTH_STATE");

const signIn = actionCreator("SIGN_IN");
const signOut = actionCreator("SIGN_OUT");

export const actionCreators = { signIn, signOut };

export interface IState {
    signedIn: boolean | null;
}

export const initialState: ImmutableObject<IState> = Immutable({ signedIn: null });

export const reducer = reducerWithInitialState(initialState)
    .case(signIn, (state) => state.merge({ signedIn: true }))
    .case(signOut, (state) => state.merge({ signedIn: false }));
