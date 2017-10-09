import * as analytics from "../lib/analytics";
import { IVideo, urlToVideo, videosRepository } from "../lib/videos";
import createItemsDuck from "./items";

const duck = createItemsDuck(
    "videos",
    videosRepository,
    async (url: string): Promise<IVideo> => {
        analytics.logUserEvent("AddVideo", url);
        return await urlToVideo(url);
    },
);

export const actionCreators = duck.actionCreators;

export const initialState = duck.initialState;

export const reducer = duck.reducer;

export const sagas = duck.sagas;
