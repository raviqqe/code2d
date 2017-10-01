import Immutable = require("seamless-immutable");
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

type Page = "tasks" | "articles" | "videos";

const actionCreator = actionCreatorFactory();

const setPage = actionCreator<Page>("SET_PAGE");

export const actionCreators = { setPage };

export const initialState = Immutable({ page: "tasks" as Page });

export const reducer = reducerWithInitialState(initialState)
    .case(setPage, (state, page) => state.merge({ page }));
