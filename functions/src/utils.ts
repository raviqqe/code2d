import * as geoip from "geoip-lite";

export function convertIpIntoCountry(ip: string): string {
    return geoip.lookup(ip).country;
}

export function urlToItemConverter<A extends { name: string }>(
    converter: (url: string, options?: object) => Promise<A>,
): (url: string, options?: object) => Promise<A> {
    return async (url: string, options: object = {}): Promise<A> => {
        const item = await converter(url, options);

        if (!item.name) {
            throw new Error(`Invalid item is detected: ${item}`);
        }

        return item;
    };
}

export function isIsbn(isbn: string): boolean {
    return typeof isbn === "string" && [10, 13].includes(isbn.length);
}
