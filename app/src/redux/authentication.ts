import { REHYDRATE } from "redux-persist/constants";
import { SagaIterator } from "redux-saga";
import { all, call, put, select, takeEvery } from "redux-saga/effects";
import Immutable = require("seamless-immutable");
import { ImmutableObject } from "seamless-immutable";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import { articlesRepository } from "../lib/articles";
import { tasksRepository } from "../lib/tasks";
import { videosRepository } from "../lib/videos";
import * as articles from "./articles";
import * as books from "./books";
import * as settings from "./settings";
import * as tasks from "./tasks";
import * as utils from "./utils";
import * as videos from "./videos";

const actionCreator = actionCreatorFactory("AUTH_STATE");

const setSignInState = actionCreator<boolean>("SET_SIGN_IN_STATE");

export const actionCreators = { setSignInState };

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
];
