import { compareArray, timePrefixZero } from "./utils";

describe("compareArray", () => {
  test("to euqals", () => {
    expect(compareArray(["1", "2", "3"], ["1", "2", "3"])).toBeTruthy();
  });

  test("to difference1", () => {
    expect(compareArray(["1", "2", "3"], ["1", "2", "4"])).toBeFalsy();
  });

  test("to difference2", () => {
    expect(compareArray(["1", "2"], ["1", "2", "3"])).toBeFalsy();
  });
});

describe("timePrefixZero", () => {
  test("bigger than 9", () => {
    expect(timePrefixZero(10)).toEqual("10");
    expect(timePrefixZero(30)).toEqual("30");
    expect(timePrefixZero(59)).toEqual("59");
  });
  test("smaller than 10", () => {
    expect(timePrefixZero(9)).toEqual("09");
    expect(timePrefixZero(5)).toEqual("05");
    expect(timePrefixZero(0)).toEqual("00");
  });
});
