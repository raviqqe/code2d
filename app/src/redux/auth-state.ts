import { REHYDRATE } from "redux-persist/constants";
import { SagaIterator } from "redux-saga";
import { all, call, put, select, takeEvery } from "redux-saga/effects";
import Immutable = require("seamless-immutable");
import { ImmutableObject } from "seamless-immutable";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import { tasksRepository } from "../lib/tasks";
import * as articles from "./articles";
import * as books from "./books";
import * as tasks from "./tasks";
import * as utils from "./utils";

const actionCreator = actionCreatorFactory("AUTH_STATE");

const signIn = actionCreator("SIGN_IN");
const signOut = actionCreator("SIGN_OUT");

export const actionCreators = { signIn, signOut };

export interface IState {
    rehydrated: boolean;
    signedIn: boolean | null;
}

export const initialState: ImmutableObject<IState>
    = Immutable({ rehydrated: false, signedIn: null });

const subReducer = reducerWithInitialState(initialState)
    .case(signIn, (state) => state.merge({ signedIn: true }))
    .case(signOut, (state) => state.merge({ signedIn: false }));

export function reducer(state: ImmutableObject<IState> = initialState, action) {
    if (action.type === REHYDRATE) {
        return state.merge({ rehydrated: true });
    }

    return subReducer(state, action);
}

function* initialize(): SagaIterator {
    const { rehydrated, signedIn }: IState = yield select(({ authState }) => authState);

    if (rehydrated && signedIn) {
        yield all([
            put(articles.actionCreators.getArticles()),
            put(books.actionCreators.getBooks()),
            put(tasks.actionCreators.getItems()),
            call(tasksRepository(false).get),
            call(tasksRepository(true).get),
        ]);
    }
}

export const sagas = [
    takeEvery(REHYDRATE, initialize),
    utils.takeEvery(signIn, initialize),
];
