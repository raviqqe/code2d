import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

const actionCreator = actionCreatorFactory("AUTH_STATE");

const signIn = actionCreator<null>("SIGN_IN");
const signOut = actionCreator<null>("SIGN_OUT");

export default {
    signIn: () => signIn(null),
    signOut: () => signOut(null),
};

export const initialState = { signedIn: false };

export const reducer = reducerWithInitialState(initialState)
    .case(signIn, () => ({ signedIn: true }))
    .case(signOut, () => ({ signedIn: false }));
