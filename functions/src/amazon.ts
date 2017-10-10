import axios from "axios";
import { parse } from "url";

export async function convertUrlIntoIsbn(url: string): Promise<string> {
    return (await axios.get(url)).data.match(/<li><b>ISBN-10:<\/b> *([0-9X]+) *<\/li>/i)[1];
}

export function isValidUrl(url: string): boolean {
    return !!parse(url).hostname.match(/^www\.amazon\./);
}
