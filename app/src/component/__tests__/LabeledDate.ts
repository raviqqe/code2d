import { formatDate } from "../LabeledDate";

it("checks dates", () => {
    expect(typeof formatDate("2017-11-08")).toBe("string");
    expect(formatDate("2017年11月8日")).toBe("2017年11月8日");
    expect(typeof formatDate(Date.now().toString())).toBe("string");
    expect(formatDate("This sentence should not be a date. Don't you think so?")).toBe(null);
});
