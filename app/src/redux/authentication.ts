import { StoreCreator } from "redux";
import { REHYDRATE } from "redux-persist/constants";
import { SagaIterator } from "redux-saga";
import { all, call, put, select, takeEvery } from "redux-saga/effects";
import Immutable = require("seamless-immutable");
import { ImmutableObject } from "seamless-immutable";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import * as analytics from "../lib/analytics";
import * as firebase from "../lib/firebase";
import * as articles from "./articles";
import * as books from "./books";
import * as message from "./message";
import * as settings from "./settings";
import * as tasks from "./tasks";
import * as utils from "./utils";
import * as videos from "./videos";

const actionCreator = actionCreatorFactory("AUTHENTICATION");

const deleteAccount = actionCreator("DELETE_ACCOUNT");
const setSignInState = actionCreator<boolean>("SET_SIGN_IN_STATE");
const signIn = actionCreator.async<null, null>("SIGN_IN");
const signOut = actionCreator("SIGN_OUT");

export const actionCreators = {
    deleteAccount,
    setSignInState,
    signIn: () => signIn.started(null),
    signOut,
};

export const signInActions = signIn;

export interface IState {
    rehydrated: boolean;
    signedIn: boolean | null;
}

export const initialState: ImmutableObject<IState>
    = Immutable({ rehydrated: false, signedIn: null });

const subReducer = reducerWithInitialState(initialState)
    .case(setSignInState, (state, signedIn) => state.merge({ signedIn }));

export function reducer(state: ImmutableObject<IState> = initialState, action) {
    if (action.type === REHYDRATE) {
        return state.merge({ rehydrated: true });
    }

    return subReducer(state, action);
}

function* initialize(): SagaIterator {
    const { rehydrated, signedIn }: IState = yield select(({ authentication }) => authentication);

    if (rehydrated && signedIn) {
        yield all([
            put(articles.actionCreators.getItems()),
            put(articles.actionCreators.getTrendingItems()),
            put(books.actionCreators.getItems()),
            put(books.actionCreators.getTrendingItems()),
            put(tasks.actionCreators.getItems()),
            put(tasks.actionCreators.getTags()),
            put(videos.actionCreators.getItems()),
            put(videos.actionCreators.getTrendingItems()),
            put(settings.actionCreators.checkNotificationPermission()),
        ]);
    }
}

export const sagas = [
    utils.takeEvery(
        deleteAccount,
        function* _(): SagaIterator {
            yield call(firebase.deleteAccount);
        }),
    takeEvery(REHYDRATE, initialize),
    utils.takeEvery(setSignInState, initialize),
    utils.takeEvery(
        signIn.started,
        function* _(): SagaIterator {
            try {
                yield put(message.actionCreators.sendMessage(
                    "Signing in...",
                    { temporary: false }));

                yield call(firebase.signIn);
                yield put(signIn.done({ params: null, result: null }));

                yield put(message.actionCreators.clearMessage());
            } catch (error) {
                yield put(signIn.failed({ params: null, error }));

                yield put(message.actionCreators.sendMessage(
                    "Could not sign in.",
                    { error: true }));
            }
        }),
    utils.takeEvery(
        signOut,
        function* _(): SagaIterator {
            yield call(firebase.signOut);
        }),
];

export function enhancer(createStore: StoreCreator): StoreCreator {
    return (reducer, state?, enhancer?) => {
        const store = createStore(reducer, state, enhancer);

        firebase.onAuthStateChanged(async (user) => {
            if (user === null) {
                store.dispatch(setSignInState(false));
            } else {
                analytics.setUserId(user.uid);
                store.dispatch(setSignInState(true));
            }
        });

        return store;
    };
}
