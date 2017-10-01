import { isDate } from "../utils";

it("checks dates", () => {
    expect(isDate("2017-11-08")).toBe(true);
    expect(isDate("Hello, world!")).toBe(false);
    expect(isDate(123456789)).toBe(true);
});
