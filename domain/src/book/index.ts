export function convertCountryIntoBookStoreUrl(country: string): string {
    // country is ISO-3166-1 country code of 2 letters.
    return country === "JP"
        ? "https://books.rakuten.co.jp/book/computer/"
        : "https://www.betterworldbooks.com/computer-books-technology-books-H817.aspx";
}
