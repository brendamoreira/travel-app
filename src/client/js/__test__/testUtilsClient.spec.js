import { tripDays } from "../utils";

describe("test duration of trip", () => {
  test("should return 3 days", () => {
    let date1 = new Date();
    let date2 = date1.getTime() + 24 * 10 * 3600 * 1000; //10 days
    expect(tripDays(date1, date2)).toBe(10);
  });
});
