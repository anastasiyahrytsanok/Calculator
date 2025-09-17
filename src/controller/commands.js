import { DOT } from '../constants.js';

export const Digit = (digit) => ({
  execute(calc) {
    calc.inputDigit(digit);
  },
});

export const Dot = () => ({
  execute(calc) {
    calc.inputDigit(DOT);
  },
});

export const Operator = (operator) => ({
  execute(calc) {
    calc.setOperator(operator);
  },
});

export const Equals = () => ({
  execute(calc) {
    calc.equals();
  },
});

export const Clear = () => ({
  execute(calc) {
    calc.clearAll();
  },
});

export const Percent = () => ({
  execute(calc) {
    calc.percent();
  },
});
