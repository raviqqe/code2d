import { actionCreators, initialState, reducer } from "../pages";

function getState(store): typeof initialState {
    return store.getState().pages;
}

it("sets a current page", () => {
    expect(initialState.currentPage).toBe("tasks");
    const state = reducer(initialState, actionCreators.setCurrentPage("articles"));
    expect(state.currentPage).toBe("articles");
});
