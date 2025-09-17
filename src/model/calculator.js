import { OPERATORS, OPERATORS_SYMBOLS, ERROR, ZERO, DOT } from '../constants.js';

export function createCalculator() {
  let display = ZERO,
    accumulator = 0,
    operator = null,
    waiting = true;

  const isError = () => display === ERROR;

  function getDisplay() {
    return display;
  }

  function getExpression() {
    if (isError()) return ERROR;

    let sym = toSymbol(operator);

    if (!operator) return display;

    if (waiting) return `${accumulator} ${sym}`;

    if (display === OPERATORS_SYMBOLS.SUB) return `${accumulator} ${sym} ${OPERATORS_SYMBOLS.SUB}`;

    return `${accumulator} ${sym} ${display}`;
  }

  function inputDigit(digit) {
    if (isError()) {
      display = digit === DOT ? `${ZERO}${DOT}` : digit;
      accumulator = 0;
      operator = null;
      waiting = false;
      return;
    }

    if (digit === DOT && display.includes(DOT)) return;

    if (display === OPERATORS_SYMBOLS.SUB && digit === DOT) {
      display = OPERATORS_SYMBOLS.SUB + `${ZERO}${DOT}`;
      return;
    }

    if (digit === '.' && display === OPERATORS_SYMBOLS.SUB) {
      display = OPERATORS_SYMBOLS.SUB + `${ZERO}${DOT}`;
      return;
    }

    if (waiting) {
      display = digit === DOT ? `${ZERO}${DOT}` : digit;
      waiting = false;
    } else {
      display = display === ZERO && digit !== DOT ? digit : display + digit;
    }
  }

  function setOperator(nextOperator) {
    if (isError()) return;

    if (waiting) {
      const enteringRight = operator != null;
      if (enteringRight && nextOperator === OPERATORS.SUB) {
        if (display !== OPERATORS_SYMBOLS.SUB) {
          display = OPERATORS_SYMBOLS.SUB;
          waiting = false;
        }
      } else {
        operator = nextOperator;
      }
      return;
    }

    if (display === OPERATORS_SYMBOLS.SUB) {
      operator = nextOperator;
      waiting = true;
      display = String(accumulator);
      return;
    }

    const x = display;

    if (operator === OPERATORS.DIV && x === 0) {
      display = ERROR;
      operator = null;
      waiting = true;
      accumulator = 0;
      return;
    }

    accumulator = operator ? compute(accumulator, x, operator) : x;
    operator = nextOperator;
    waiting = true;
    display = String(accumulator);
  }

  function equals() {
    if (isError() || !operator || waiting || display === OPERATORS_SYMBOLS.SUB) return;

    const x = display;

    if (operator === OPERATORS.DIV && x === 0) {
      display = ERROR;
      operator = null;
      waiting = true;
      accumulator = 0;
      return;
    }

    accumulator = compute(accumulator, x, operator);
    display = String(accumulator);

    operator = null;
    waiting = true;
  }

  function clearAll() {
    display = ZERO;
    accumulator = 0;
    operator = null;
    waiting = true;
  }

  return { getDisplay, getExpression, inputDigit, setOperator, equals, clearAll };
}

function compute(a, b, operator) {
  if (operator === OPERATORS.PLUS) return a + b;
  if (operator === OPERATORS.SUB) return a - b;
  if (operator === OPERATORS.MUL) return a * b;
  if (operator === OPERATORS.DIV) return b === ZERO ? ERROR : a / b;
  return b;
}

function toSymbol(operator) {
  switch (operator) {
    case OPERATORS.PLUS:
      return OPERATORS_SYMBOLS.PLUS;
    case OPERATORS.SUB:
      return OPERATORS_SYMBOLS.SUB;
    case OPERATORS.MUL:
      return OPERATORS_SYMBOLS.MUL;
    case OPERATORS.DIV:
      return OPERATORS_SYMBOLS.DIV;
    default:
      return '';
  }
}
