import { toSymbol, isEven, normalizeResult } from '../utils.js';
import { OPERATORS, OPERATORS_SYMBOLS, PERCENT, ERROR } from '../constants.js';

describe('normalizeResult (round to 12, trim zeros, return string)', () => {
  test('NaN / ±Infinity -> ERROR', () => {
    expect(normalizeResult(NaN)).toBe(ERROR);
    expect(normalizeResult(Infinity)).toBe(ERROR);
    expect(normalizeResult(-Infinity)).toBe(ERROR);
  });

  test('removes floating-point noise (0.1 + 0.2 -> "0.3")', () => {
    const x = 0.1 + 0.2;
    expect(normalizeResult(x)).toBe('0.3');
  });

  test('rounds to 12 decimals (and trims trailing zeros)', () => {
    expect(normalizeResult(42)).toBe('42');
    expect(normalizeResult(1.2)).toBe('1.2');
    expect(normalizeResult(1.0000000000001)).toBe('1');
  });

  test('more than 12 fractional digits', () => {
    expect(normalizeResult(1.234567890123456)).toBe('1.234567890123');
  });

  test('rounding up to an integer', () => {
    expect(normalizeResult(2.9999999999996)).toBe('3');
  });

  test('negative numbers', () => {
    expect(normalizeResult(-3.141592653589793)).toBe('-3.14159265359');
  });

  test('very small numbers -> "0', () => {
    expect(normalizeResult(1e-13)).toBe('0');
  });

  test('-0 becomes "0"', () => {
    expect(normalizeResult(-0)).toBe('0');
  });
});

describe('isEven', () => {
  test('even/odd integers', () => {
    expect(isEven(4)).toBe(true);
    expect(isEven(-2)).toBe(true);
    expect(isEven(3)).toBe(false);
  });

  test('numeric strings also work', () => {
    expect(isEven('4')).toBe(true);
    expect(isEven('4.0')).toBe(true);
    expect(isEven('3')).toBe(false);
  });

  test('non-integers -> false', () => {
    expect(isEven(2.5)).toBe(false);
    expect(isEven('2.5')).toBe(false);
  });

  test('invalid values -> false', () => {
    expect(isEven('abc')).toBe(false);
    expect(isEven(NaN)).toBe(false);
    expect(isEven(Infinity)).toBe(false);
  });
});

describe('toSymbol', () => {
  test('returns symbols for known operators', () => {
    expect(toSymbol(OPERATORS.PLUS)).toBe(OPERATORS_SYMBOLS.PLUS);
    expect(toSymbol(OPERATORS.SUB)).toBe(OPERATORS_SYMBOLS.SUB);
    expect(toSymbol(OPERATORS.MUL)).toBe(OPERATORS_SYMBOLS.MUL);
    expect(toSymbol(OPERATORS.DIV)).toBe(OPERATORS_SYMBOLS.DIV);
    expect(toSymbol(OPERATORS.PERCENT)).toBe(PERCENT);
  });

  test('unknown operator -> empty string', () => {
    expect(toSymbol('__UNKNOWN__')).toBe('');
  });
});
