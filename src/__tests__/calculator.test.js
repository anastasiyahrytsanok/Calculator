import { CreateCalculator } from '../model/calculator.js';
import { OPERATORS, ERROR, MAX_FACTORIAL_NUMBER } from '../constants.js';

function typeNumber(calc, value) {
  for (const char of String(value)) calc.inputDigit(char);
}

function getCalculatorDisplay(calc) {
  return calc.getExpression();
}

let calculator;

beforeEach(() => {
  calculator = new CreateCalculator();
});

describe('compute', () => {
  test('coerces a and b to numbers', () => {
    expect(calculator.compute('2', '3', OPERATORS.PLUS)).toBe('5');
  });

  test('basic operations with integers: + - * /', () => {
    expect(calculator.compute(2, 3, OPERATORS.PLUS)).toBe('5');
    expect(calculator.compute(5, 8, OPERATORS.SUB)).toBe('-3');
    expect(calculator.compute(4, 6, OPERATORS.MUL)).toBe('24');
    expect(calculator.compute(8, 2, OPERATORS.DIV)).toBe('4');
  });

  test('basic operations with fractional numbers: + - * /', () => {
    expect(calculator.compute(2.45, 3.3, OPERATORS.PLUS)).toBe('5.75');
    expect(calculator.compute(5.91, 8.365, OPERATORS.SUB)).toBe('-2.455');
    expect(calculator.compute(4, 2.685, OPERATORS.MUL)).toBe('10.74');
    expect(calculator.compute(8.24, 2, OPERATORS.DIV)).toBe('4.12');
  });

  test('division by zero is normalized to ERROR', () => {
    expect(() => calculator.compute(1, 0, OPERATORS.DIV)).toThrow(Error);
  });

  test('unknown operator -> returns second argument (normalized)', () => {
    expect(calculator.compute(100, 7, '__UNKNOWN__')).toBe('7');
    expect(calculator.compute(100, Infinity, '__UNKNOWN__')).toBe(ERROR);
  });
});

describe('Addition + equals', () => {
  test('addition of integers', () => {
    typeNumber(calculator, '12');
    calculator.setOperator(OPERATORS.PLUS);
    typeNumber(calculator, '8');
    calculator.equals();
    expect(getCalculatorDisplay(calculator)).toBe('20');
  });

  test('addition of fractional numbers', () => {
    typeNumber(calculator, '12.35');
    calculator.setOperator(OPERATORS.PLUS);
    typeNumber(calculator, '8.598');
    calculator.equals();
    expect(getCalculatorDisplay(calculator)).toBe('20.948');
  });

  test('addition of negative numbers', () => {
    typeNumber(calculator, '-12.35');
    calculator.setOperator(OPERATORS.PLUS);
    typeNumber(calculator, '-8.598');
    calculator.equals();
    expect(getCalculatorDisplay(calculator)).toBe('-20.948');
  });

  test('addition with one negative number', () => {
    typeNumber(calculator, '-12.35');
    calculator.setOperator(OPERATORS.PLUS);
    typeNumber(calculator, '8.598');
    calculator.equals();
    expect(getCalculatorDisplay(calculator)).toBe('-3.752');
  });

  test('addition with 0', () => {
    typeNumber(calculator, '-12.35');
    calculator.setOperator(OPERATORS.PLUS);
    typeNumber(calculator, '0');
    calculator.equals();
    expect(getCalculatorDisplay(calculator)).toBe('-12.35');
  });

  test('addition with 0.', () => {
    typeNumber(calculator, '-12.35');
    calculator.setOperator(OPERATORS.PLUS);
    typeNumber(calculator, '0.');
    calculator.equals();
    expect(getCalculatorDisplay(calculator)).toBe('-12.35');
  });
});

describe('Subtraction + equals', () => {
  test('subtraction of integers', () => {
    typeNumber(calculator, '12');
    calculator.setOperator(OPERATORS.SUB);
    typeNumber(calculator, '8');
    calculator.equals();
    expect(getCalculatorDisplay(calculator)).toBe('4');
  });

  test('subtraction of fractional numbers', () => {
    typeNumber(calculator, '12.35');
    calculator.setOperator(OPERATORS.SUB);
    typeNumber(calculator, '8.598');
    calculator.equals();
    expect(getCalculatorDisplay(calculator)).toBe('3.752');
  });

  test('subtraction of negative numbers', () => {
    typeNumber(calculator, '-12.35');
    calculator.setOperator(OPERATORS.SUB);
    typeNumber(calculator, '-8.598');
    calculator.equals();
    expect(getCalculatorDisplay(calculator)).toBe('-3.752');
  });

  test('subtraction with one negative number', () => {
    typeNumber(calculator, '-12.35');
    calculator.setOperator(OPERATORS.SUB);
    typeNumber(calculator, '8.598');
    calculator.equals();
    expect(getCalculatorDisplay(calculator)).toBe('-20.948');
  });

  test('subtraction with 0', () => {
    typeNumber(calculator, '-12.35');
    calculator.setOperator(OPERATORS.SUB);
    typeNumber(calculator, '0');
    calculator.equals();
    expect(getCalculatorDisplay(calculator)).toBe('-12.35');
  });

  test('subtraction with 0.', () => {
    typeNumber(calculator, '-12.35');
    calculator.setOperator(OPERATORS.SUB);
    typeNumber(calculator, '0.');
    calculator.equals();
    expect(getCalculatorDisplay(calculator)).toBe('-12.35');
  });
});

describe('Multiplication + equals', () => {
  test('multiplication of integers', () => {
    typeNumber(calculator, '12');
    calculator.setOperator(OPERATORS.MUL);
    typeNumber(calculator, '8');
    calculator.equals();
    expect(getCalculatorDisplay(calculator)).toBe('96');
  });

  test('multiplication of fractional numbers', () => {
    typeNumber(calculator, '12.35');
    calculator.setOperator(OPERATORS.MUL);
    typeNumber(calculator, '8.598');
    calculator.equals();
    expect(getCalculatorDisplay(calculator)).toBe('106.1853');
  });

  test('multiplication of negative numbers', () => {
    typeNumber(calculator, '-12.35');
    calculator.setOperator(OPERATORS.MUL);
    typeNumber(calculator, '-8.598');
    calculator.equals();
    expect(getCalculatorDisplay(calculator)).toBe('106.1853');
  });

  test('multiplication with one negative number', () => {
    typeNumber(calculator, '-12.35');
    calculator.setOperator(OPERATORS.MUL);
    typeNumber(calculator, '8.598');
    calculator.equals();
    expect(getCalculatorDisplay(calculator)).toBe('-106.1853');
  });

  test('multiplication with 0', () => {
    typeNumber(calculator, '-12.35');
    calculator.setOperator(OPERATORS.MUL);
    typeNumber(calculator, '0');
    calculator.equals();
    expect(getCalculatorDisplay(calculator)).toBe('0');
  });

  test('multiplication with 0.', () => {
    typeNumber(calculator, '-12.35');
    calculator.setOperator(OPERATORS.MUL);
    typeNumber(calculator, '0.');
    calculator.equals();
    expect(getCalculatorDisplay(calculator)).toBe('0');
  });
});

describe('Division + equals', () => {
  test('division of integers', () => {
    typeNumber(calculator, '12');
    calculator.setOperator(OPERATORS.DIV);
    typeNumber(calculator, '3');
    calculator.equals();
    expect(getCalculatorDisplay(calculator)).toBe('4');
  });

  test('division of fractional numbers', () => {
    typeNumber(calculator, '12.44');
    calculator.setOperator(OPERATORS.DIV);
    typeNumber(calculator, '8.5');
    calculator.equals();
    expect(getCalculatorDisplay(calculator)).toBe('1.463529411765');
  });

  test('division of negative numbers', () => {
    typeNumber(calculator, '-12.44');
    calculator.setOperator(OPERATORS.DIV);
    typeNumber(calculator, '-8.5');
    calculator.equals();
    expect(getCalculatorDisplay(calculator)).toBe('1.463529411765');
  });

  test('division with one negative number', () => {
    typeNumber(calculator, '-12.35');
    calculator.setOperator(OPERATORS.DIV);
    typeNumber(calculator, '8.598');
    calculator.equals();
    expect(getCalculatorDisplay(calculator)).toBe('-1.436380553617');
  });

  test('division of 0', () => {
    typeNumber(calculator, '0');
    calculator.setOperator(OPERATORS.DIV);
    typeNumber(calculator, '-12.35');
    calculator.equals();
    expect(getCalculatorDisplay(calculator)).toBe('0');
  });

  test('division by 0', () => {
    typeNumber(calculator, '-12.35');
    calculator.setOperator(OPERATORS.DIV);
    typeNumber(calculator, '0');
    calculator.equals();
    expect(getCalculatorDisplay(calculator)).toBe(ERROR);
  });

  test('division by 0.', () => {
    typeNumber(calculator, '-12.35');
    calculator.setOperator(OPERATORS.DIV);
    typeNumber(calculator, '0.');
    calculator.equals();
    expect(getCalculatorDisplay(calculator)).toBe(ERROR);
  });
});

describe('Percent (%) behavior', () => {
  test('simple x% (no operator)', () => {
    typeNumber(calculator, '50');
    calculator.percent();
    expect(getCalculatorDisplay(calculator)).toBe('0.5');
  });

  test('Percent with addition', () => {
    typeNumber(calculator, '200');
    calculator.setOperator(OPERATORS.PLUS);
    typeNumber(calculator, '10');
    calculator.percent();
    expect(getCalculatorDisplay(calculator)).toBe('220');
  });

  test('Percent with subtraction', () => {
    typeNumber(calculator, '200');
    calculator.setOperator(OPERATORS.SUB);
    typeNumber(calculator, '10');
    calculator.percent();
    expect(getCalculatorDisplay(calculator)).toBe('180');
  });

  test('Percent with multiplication', () => {
    typeNumber(calculator, '200');
    calculator.setOperator(OPERATORS.MUL);
    typeNumber(calculator, '10');
    calculator.percent();
    expect(getCalculatorDisplay(calculator)).toBe('20');
  });

  test('Percent with division', () => {
    typeNumber(calculator, '200');
    calculator.setOperator(OPERATORS.DIV);
    typeNumber(calculator, '10');
    calculator.percent();
    expect(getCalculatorDisplay(calculator)).toBe('2000');
  });
});

describe('Sign change (±)', () => {
  test('toggles sign of current integer', () => {
    typeNumber(calculator, '5');
    calculator.signChange();
    expect(getCalculatorDisplay(calculator)).toBe('-5');
    calculator.signChange();
    expect(getCalculatorDisplay(calculator)).toBe('5');
  });

  test('toggles sign of current fractional', () => {
    typeNumber(calculator, '5.25');
    calculator.signChange();
    expect(getCalculatorDisplay(calculator)).toBe('-5.25');
    calculator.signChange();
    expect(getCalculatorDisplay(calculator)).toBe('5.25');
  });

  test('toggles sign of 0', () => {
    typeNumber(calculator, '0');
    calculator.signChange();
    expect(getCalculatorDisplay(calculator)).toBe('0');
    calculator.signChange();
    expect(getCalculatorDisplay(calculator)).toBe('0');
  });

  test('toggles sign of 0.', () => {
    typeNumber(calculator, '0.');
    calculator.signChange();
    expect(getCalculatorDisplay(calculator)).toBe('0');
    calculator.signChange();
    expect(getCalculatorDisplay(calculator)).toBe('0');
  });
});

describe('Degrees', () => {
  test('square degree', () => {
    typeNumber(calculator, '4');
    calculator.toSquare();
    calculator.equals();
    expect(getCalculatorDisplay(calculator)).toBe('16');
  });

  test('cube degree', () => {
    typeNumber(calculator, '3');
    calculator.toCube();
    calculator.equals();
    expect(getCalculatorDisplay(calculator)).toBe('27');
  });

  test('integer to a positive degree', () => {
    typeNumber(calculator, '2');
    calculator.toDegree();
    typeNumber(calculator, '5');
    calculator.equals();
    expect(getCalculatorDisplay(calculator)).toBe('32');
  });

  test('integer to a negative degree', () => {
    typeNumber(calculator, '2');
    calculator.toDegree();
    typeNumber(calculator, '-5');
    calculator.equals();
    expect(getCalculatorDisplay(calculator)).toBe('0.03125');
  });

  test('fractional number to a positive degree', () => {
    typeNumber(calculator, '2.25');
    calculator.toDegree();
    typeNumber(calculator, '5');
    calculator.equals();
    expect(getCalculatorDisplay(calculator)).toBe('57.6650390625');
  });

  test('fractional number to a negative degree', () => {
    typeNumber(calculator, '2.25');
    calculator.toDegree();
    typeNumber(calculator, '-5');
    calculator.equals();
    expect(getCalculatorDisplay(calculator)).toBe('0.017341529916');
  });

  test('number to a positive fractional degree', () => {
    typeNumber(calculator, '2.25');
    calculator.toDegree();
    typeNumber(calculator, '5.23');
    calculator.equals();
    expect(getCalculatorDisplay(calculator)).toBe('69.488761246525');
  });

  test('number to a negative fractional degree', () => {
    typeNumber(calculator, '2.25');
    calculator.toDegree();
    typeNumber(calculator, '-5.34');
    calculator.equals();
    expect(getCalculatorDisplay(calculator)).toBe('0.013162711219');
  });

  test('number to a zero degree', () => {
    typeNumber(calculator, '2.25');
    calculator.toDegree();
    typeNumber(calculator, '0');
    calculator.equals();
    expect(getCalculatorDisplay(calculator)).toBe('1');
  });

  test('zero to a degree', () => {
    typeNumber(calculator, '0');
    calculator.toDegree();
    typeNumber(calculator, '43');
    calculator.equals();
    expect(getCalculatorDisplay(calculator)).toBe('0');
  });

  test('zero to a zero degree', () => {
    typeNumber(calculator, '0');
    calculator.toDegree();
    typeNumber(calculator, '0');
    calculator.equals();
    expect(getCalculatorDisplay(calculator)).toBe('1');
  });

  test('ten to positive degree', () => {
    typeNumber(calculator, '3');
    calculator.tenToDegree();
    calculator.equals();
    expect(getCalculatorDisplay(calculator)).toBe('1000');
  });

  test('ten to negative degree', () => {
    typeNumber(calculator, '-3');
    calculator.tenToDegree();
    calculator.equals();
    expect(getCalculatorDisplay(calculator)).toBe('0.001');
  });

  test('ten to fractional degree', () => {
    typeNumber(calculator, '0.43');
    calculator.tenToDegree();
    calculator.equals();
    expect(getCalculatorDisplay(calculator)).toBe('2.691534803927');
  });

  test('ten to zero degree', () => {
    typeNumber(calculator, '0');
    calculator.tenToDegree();
    calculator.equals();
    expect(getCalculatorDisplay(calculator)).toBe('1');
  });
});

describe('Inverse (1/x)', () => {
  test('inverse with positive integer', () => {
    typeNumber(calculator, '4');
    calculator.inverse();
    expect(getCalculatorDisplay(calculator)).toBe('0.25');
  });

  test('inverse with negative integer', () => {
    typeNumber(calculator, '-4');
    calculator.inverse();
    expect(getCalculatorDisplay(calculator)).toBe('-0.25');
  });

  test('inverse with fractional number', () => {
    typeNumber(calculator, '0.25');
    calculator.inverse();
    expect(getCalculatorDisplay(calculator)).toBe('4');
  });

  test('inverse with zero', () => {
    typeNumber(calculator, '0');
    calculator.inverse();
    expect(getCalculatorDisplay(calculator)).toBe(ERROR);
  });
});

describe('Factorial (x!)', () => {
  test('factorial with positive integer', () => {
    typeNumber(calculator, '5');
    calculator.factorial();
    expect(getCalculatorDisplay(calculator)).toBe('120');
  });

  test('factorial with zero', () => {
    typeNumber(calculator, '0');
    calculator.factorial();
    expect(getCalculatorDisplay(calculator)).toBe('1');
  });

  test('factorial with negative integer', () => {
    typeNumber(calculator, '-3');
    calculator.factorial();
    expect(getCalculatorDisplay(calculator)).toBe(ERROR);
  });

  test('factorial with fractional number', () => {
    typeNumber(calculator, '2.5');
    calculator.factorial();
    expect(getCalculatorDisplay(calculator)).toBe(ERROR);
  });

  test('factorial with too big number (n > 170)', () => {
    typeNumber(calculator, String(MAX_FACTORIAL_NUMBER + 1));
    calculator.factorial();
    expect(getCalculatorDisplay(calculator)).toBe(ERROR);
  });
});

describe('Radicals', () => {
  test('square radical', () => {
    typeNumber(calculator, '9');
    calculator.squareRadical();
    calculator.equals();
    expect(getCalculatorDisplay(calculator)).toBe('3');
  });

  test('cube radical', () => {
    typeNumber(calculator, '27');
    calculator.cubeRadical();
    calculator.equals();
    expect(getCalculatorDisplay(calculator)).toBe('3');
  });

  test('positive radical from positive integer', () => {
    typeNumber(calculator, '8');
    calculator.toRadical();
    typeNumber(calculator, '3');
    calculator.equals();
    expect(getCalculatorDisplay(calculator)).toBe('2');
  });

  test('negative radical from positive integer', () => {
    typeNumber(calculator, '8');
    calculator.toRadical();
    typeNumber(calculator, '-3');
    calculator.equals();
    expect(getCalculatorDisplay(calculator)).toBe('0.5');
  });

  test('positive radical from negative integer', () => {
    typeNumber(calculator, '-8');
    calculator.toRadical();
    typeNumber(calculator, '3');
    calculator.equals();
    expect(getCalculatorDisplay(calculator)).toBe('-2');
  });

  test('even degree of negative number', () => {
    typeNumber(calculator, '-8');
    calculator.squareRadical();
    calculator.equals();
    expect(getCalculatorDisplay(calculator)).toBe(ERROR);
  });

  test('odd degree of negative number', () => {
    typeNumber(calculator, '-8');
    calculator.cubeRadical();
    calculator.equals();
    expect(getCalculatorDisplay(calculator)).toBe('-2');
  });
});
