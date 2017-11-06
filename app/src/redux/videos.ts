import { getTrendingVideos, urlToVideo, videosRepository } from "../infra/videos";
import createItemsDuck from "./items";

const duck = createItemsDuck(
    "videos",
    videosRepository,
    urlToVideo,
    { getTrendingItems: getTrendingVideos });

export const actionCreators = duck.actionCreators;

export const initialState = duck.initialState;

export const reducer = duck.reducer;

export const sagas = duck.sagas;

export const persistent = true;
