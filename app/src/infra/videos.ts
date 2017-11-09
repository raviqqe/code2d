import { IVideo } from "common/domain/video";

import * as functions from "./functions";
import storage from "./storage";

export const videosRepository = storage.statefulItemsRepository<IVideo>("videos");

export async function urlToVideo(url: string): Promise<IVideo> {
    return await functions.call("video", { params: { url } });
}

export async function getTrendingVideos(): Promise<IVideo[]> {
    return await functions.call("trendingVideos");
}
