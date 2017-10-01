import Immutable = require("seamless-immutable");
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

export type Page = "tasks" | "articles" | "videos";

const actionCreator = actionCreatorFactory();

const setCurrentPage = actionCreator<Page>("SET_PAGE");

export const actionCreators = { setCurrentPage };

export const initialState = Immutable({ currentPage: "tasks" as Page });

export const reducer = reducerWithInitialState(initialState)
    .case(setCurrentPage, (state, currentPage) => state.merge({ currentPage }));
