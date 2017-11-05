import { IItem } from "./item";

export interface IBook extends IItem {
    author?: string;
    description?: string;
    image?: string;
    isbn: string;
    price?: string;
    publisher?: string;
    salesDate?: string;
    url?: string;
}

export function extractBook<A extends IBook>({
        author, description, id, image, isbn, name, price, publisher, salesDate, url,
    }: A): IBook {
    return { author, description, id, image, isbn, name, price, publisher, salesDate, url };
}

export function convertCountryIntoBookStoreUrl(country: string): string {
    // country is ISO-3166-1 country code of 2 letters.
    return country === "JP"
        ? "https://books.rakuten.co.jp/book/computer/"
        : "https://www.betterworldbooks.com/computer-books-technology-books-H817.aspx";
}
