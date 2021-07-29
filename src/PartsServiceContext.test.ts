import { isValidPartNumber } from './PartsServiceContext';

test.each([
  ['111-abcd', false],
  ['a111-abcd', false],
  ['1111-abc', false],
  ['1111abcd', false],
  ['111 1a bcd', false],
  ['1111-123abcd', true],
  ['1111-1A2abc3', true],
])('.isValidPartNumber(%s) should validate %s', (partNumber, expected) => {
  expect(isValidPartNumber(partNumber)).toBe(expected);
});
