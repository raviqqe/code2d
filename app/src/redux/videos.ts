import { uriToVideo, videosRepository } from "../lib/videos";
import createItemsDuck from "./items";

const duck = createItemsDuck("videos", videosRepository, uriToVideo);

export const actionCreators = duck.actionCreators;

export const initialState = duck.initialState;

export const reducer = duck.reducer;

export const sagas = duck.sagas;
