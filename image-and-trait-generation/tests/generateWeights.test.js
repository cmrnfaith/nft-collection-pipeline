const {
  getWeight,
  getRandomNumberBetween,
  calculateRequiredFileNumbers,
} = require("../src/weightGenerator");

test("Weight less than 100", () => {
  expect(getWeight()).toBeLessThan(100);
});
test("Random number between two numbers", () => {
  expect(getRandomNumberBetween(1, 3)).toBeGreaterThanOrEqual(1);
});

test("Calculate number of files", () => {
  expect(calculateRequiredFileNumbers(5, 100)).toBe(5);
});

test("Calculate number of files uneven", () => {
  expect(calculateRequiredFileNumbers(7, 500)).toBe(1);
});
