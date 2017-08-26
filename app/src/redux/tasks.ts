import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import { ITask } from "../lib/task";

const factory = actionCreatorFactory();

const updateTasks = factory<ITask[]>("UPDATE_TASKS");

export default { updateTasks };

export const initialState: { tasks: ITask[] } = { tasks: [] };

export const reducer = reducerWithInitialState(initialState)
    .case(updateTasks, (_, tasks) => ({ tasks }));
