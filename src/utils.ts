export const compareArray = (arrayA: string[], arrayB: string[]) => {
  let newArrayA = Object.assign([], arrayA);
  newArrayA = newArrayA.sort((a, b) => a - b);
  let newArrayB = Object.assign([], arrayB);
  newArrayB = newArrayB.sort((a, b) => a - b);

  if (newArrayA.length === newArrayB.length) {
    while (newArrayA.length) {
      if (newArrayA.shift() !== newArrayB.shift()) {
        return false;
      }
    }
    return true;
  }
  return false;
};

export const timePrefixZero = (value: number) =>
  `${value < 10 ? "0" : ""}${value}`;
