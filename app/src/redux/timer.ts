import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

const toggleTimer = actionCreatorFactory()("TOGGLE_TIMER");

export const actionCreators = { toggleTimer };

export interface IState {
    on: boolean;
}

export const initialState: IState = { on: false };

export const reducer = reducerWithInitialState(initialState)
    .case(toggleTimer, ({ on }: IState) => ({ on: !on }));
