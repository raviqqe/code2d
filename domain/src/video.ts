import { IItem } from "./item";

export interface IVideo extends IItem {
    description?: string;
    embedUrl: string;
    publishedAt?: string;
    url: string;
}

export function extractVideo(
    { description, embedUrl, id, name, publishedAt, url }: IVideo,
): IVideo {
    return { description, embedUrl, id, name, publishedAt, url };
}
