import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";

import * as firebase from "../lib/firebase";
import { ITask, Tasks } from "../lib/task";
import * as addTask from "./add-task";
import authStateActionCreators from "./auth-state";
import * as authState from "./auth-state";
import * as signIn from "./sign-in";
import * as tasks from "./tasks";

export default function() {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        combineReducers({
            addTask: addTask.reducer,
            authState: authState.reducer,
            signIn: signIn.reducer,
            tasks: tasks.reducer,
        }),
        compose(applyMiddleware(sagaMiddleware)));

    sagaMiddleware.run(function* _() {
        yield all([...addTask.sagas, ...signIn.sagas, ...tasks.sagas]);
    });

    firebase.onAuthStateChanged((user) => {
        if (user === null) {
            store.dispatch(authStateActionCreators.signOut());
        } else {
            store.dispatch(authStateActionCreators.signIn());
            (new Tasks()).onUndoneTasksUpdate((ts: ITask[]) =>
                store.dispatch(tasks.actionCreators.updateTasks(ts)));
        }
    });

    return store;
}
