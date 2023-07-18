const { add, subtract, multiply, divide } = require('./testcases');


test('adds two positive numbers', () => {
  expect(add(2, 3)).toBe(5);
});

test('adds two negative numbers', () => {
  expect(add(-5, -3)).toBe(-8);
});

test('adds a positive and a negative number', () => {
  expect(add(10, -7)).toBe(3);
});

test('adds zero to a number', () => {
  expect(add(5, 0)).toBe(5);
});

test('adds two floating-point numbers', () => {
  expect(add(2.5, 3.7)).toBeCloseTo(6.2);
});

// Test cases for the subtract function
test('subtracts two positive numbers', () => {
  expect(subtract(5, 3)).toBe(2);
});

test('subtracts two negative numbers', () => {
  expect(subtract(-5, -3)).toBe(-2);
});

test('subtracts a positive number from a negative number', () => {
  expect(subtract(-5, 7)).toBe(-12);
});

test('subtracts zero from a number', () => {
  expect(subtract(5, 0)).toBe(5);
});

test('subtracts two floating-point numbers', () => {
  expect(subtract(5.7, 3.2)).toBeCloseTo(2.5);
});

// Test cases for the multiply function
test('multiplies two positive numbers', () => {
  expect(multiply(4, 6)).toBe(24);
});

test('multiplies two negative numbers', () => {
  expect(multiply(-4, -6)).toBe(24);
});

test('multiplies a positive and a negative number', () => {
  expect(multiply(4, -6)).toBe(-24);
});

test('multiplies a number by zero', () => {
  expect(multiply(5, 0)).toBe(0);
});

test('multiplies two floating-point numbers', () => {
  expect(multiply(2.5, 3.5)).toBeCloseTo(8.75);
});

// Test cases for the divide function
test('divides two positive numbers', () => {
  expect(divide(20, 4)).toBe(5);
});

test('divides two negative numbers', () => {
  expect(divide(-20, -4)).toBe(5);
});

test('divides a positive number by a negative number', () => {
  expect(divide(20, -4)).toBe(-5);
});

test('divides a number by one', () => {
  expect(divide(5, 1)).toBe(5);
});

test('divides two floating-point numbers', () => {
  expect(divide(10.5, 2.5)).toBeCloseTo(4.2);
});

test('dividing by zero should throw an error', () => {
  expect(() => divide(10, 0)).toThrow('Cannot divide by zero');
});
