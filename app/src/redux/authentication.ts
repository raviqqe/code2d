import { REHYDRATE } from "redux-persist/constants";
import { SagaIterator } from "redux-saga";
import { all, call, put, select, takeEvery } from "redux-saga/effects";
import Immutable = require("seamless-immutable");
import { ImmutableObject } from "seamless-immutable";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import { articlesRepository } from "../lib/articles";
import * as firebase from "../lib/firebase";
import { tasksRepository } from "../lib/tasks";
import { videosRepository } from "../lib/videos";
import * as articles from "./articles";
import * as books from "./books";
import * as settings from "./settings";
import * as tasks from "./tasks";
import * as utils from "./utils";
import * as videos from "./videos";

const actionCreator = actionCreatorFactory("AUTHENTICATION");

const setSignInState = actionCreator<boolean>("SET_SIGN_IN_STATE");
const signIn = actionCreatorFactory().async<null, null>("SIGN_IN");
const signOut = actionCreatorFactory().async<null, null>("SIGN_OUT");

export const actionCreators = {
    setSignInState,
    signIn: () => signIn.started(null),
    signOut: () => signOut.started(null),
};

export interface IState {
    rehydrated: boolean;
    signedIn: boolean | null;
    signingIn: boolean;
}

export const initialState: ImmutableObject<IState>
    = Immutable({ rehydrated: false, signedIn: null, signingIn: false });

const subReducer = reducerWithInitialState(initialState)
    .case(setSignInState, (state, signedIn) => state.merge({ signedIn }))
    .case(signIn.started, (state) => state.merge({ signingIn: true }))
    .case(signIn.done, (state) => state.merge({ signingIn: false }))
    .case(signIn.failed, (state) => state.merge({ signingIn: false }));

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
            call(articlesRepository(false).get),
            call(articlesRepository(true).get),

            put(tasks.actionCreators.getItems()),
            put(tasks.actionCreators.getTags()),
            call(tasksRepository(false).get),
            call(tasksRepository(true).get),

            put(videos.actionCreators.getItems()),
            call(videosRepository(false).get),
            call(videosRepository(true).get),

            put(settings.actionCreators.checkNotificationPermission()),
        ]);
    }
}

export const sagas = [
    takeEvery(REHYDRATE, initialize),
    utils.takeEvery(setSignInState, initialize),
    utils.takeEvery(
        signIn.started,
        function* _(): SagaIterator {
            try {
                yield call(firebase.signIn);
                yield put(signIn.done({ params: null, result: null }));
            } catch (error) {
                yield put(signIn.failed({ params: null, error }));
            }
        }),
    utils.takeEvery(
        signOut.started,
        function* _(): SagaIterator {
            try {
                yield call(firebase.signOut);
                yield put(signOut.done({ params: null, result: null }));
            } catch (error) {
                yield put(signOut.failed({ params: null, error }));
            }
        }),
];
