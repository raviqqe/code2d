import { IItem } from "./item";

export interface IArticle extends IItem {
    date?: string;
    favicon?: string;
    image?: string;
    text?: string;
    url: string;
}

export function extractArticle(
    { date, favicon, id, image, name, text, url }: IArticle,
): IArticle {
    return { date, favicon, id, image, name, text, url };
}
