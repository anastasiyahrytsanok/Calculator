import {
  OPERATORS,
  OPERATORS_SYMBOLS,
  ERROR,
  ZERO,
  DOT,
  RADICAL_SYMBOL,
  MAX_NUMBER_LENGTH,
  MAX_FACTORIAL_NUMBER,
} from '../constants.js';
import { toSymbol, isEven, normalizeResult } from '../utils.js';

export class CreateCalculator {
  #currentInput;
  #accumulator;
  #operator;
  #isWaitingForArgument;
  #isEnteringDegree;
  #degree;
  #isEnteringRadical;
  #radical;
  #memorizedValue;
  isValueMemorized;

  constructor() {
    this.#currentInput = ZERO;
    this.#accumulator = ZERO;
    this.#operator = null;
    this.#isWaitingForArgument = true;
    this.#isEnteringDegree = false;
    this.#degree = null;
    this.#isEnteringRadical = false;
    this.#radical = null;
    this.#memorizedValue = ZERO;
    this.isValueMemorized = false;
  }

  getExpression() {
    if (this.isError()) return ERROR;

    const operatorSymbol = toSymbol(this.#operator);

    if (!this.#operator) return this.getTransformedCurrentInput();

    if (this.#isWaitingForArgument) return `${this.#accumulator} ${operatorSymbol}`;

    if (this.#currentInput === OPERATORS_SYMBOLS.SUB)
      return `${this.#accumulator} ${operatorSymbol} ${OPERATORS_SYMBOLS.SUB}`;

    return `${this.#accumulator} ${operatorSymbol} ${this.getTransformedCurrentInput()}`;
  }

  getTransformedCurrentInput() {
    if (this.#isEnteringDegree && this.#degree) {
      return `${this.#currentInput}<sup>${this.#degree}</sup>`;
    } else if (this.#isEnteringRadical) {
      return this.#radical === null
        ? `${RADICAL_SYMBOL}${this.#currentInput}`
        : `<sup>${this.#radical}</sup>${RADICAL_SYMBOL}${this.#currentInput}`;
    } else {
      return this.#currentInput;
    }
  }

  inputDigit(digit) {
    if (this.#currentInput?.length >= MAX_NUMBER_LENGTH) return;

    if (this.#isEnteringDegree) {
      this.#degree = this.applyDigit(this.#degree, digit);
      return;
    }

    if (this.#isEnteringRadical) {
      this.#radical = this.applyDigit(this.#radical, digit);
      return;
    }

    this.#currentInput = this.applyDigit(this.#currentInput, digit);
  }

  applyDigit(value, digit) {
    if (this.isError()) {
      this.#accumulator = 0;
      this.#operator = null;
      this.#isWaitingForArgument = false;
      return digit === DOT ? `${ZERO}${DOT}` : digit;
    }

    const currentValue = String(value);

    if (digit === DOT && !this.#operator && currentValue.includes(DOT)) return currentValue;

    if (digit === DOT && currentValue === OPERATORS_SYMBOLS.SUB)
      return OPERATORS_SYMBOLS.SUB + `${ZERO}${DOT}`;

    if (this.#isWaitingForArgument) {
      this.#isWaitingForArgument = false;
      return digit === DOT ? `${ZERO}${DOT}` : digit;
    }

    if ((currentValue === ZERO || currentValue === '' || value === null) && digit !== DOT)
      return digit;

    return currentValue + digit;
  }

  setOperator(nextOperator) {
    if (this.#isEnteringDegree) {
      if (nextOperator === OPERATORS.SUB && !this.#degree) {
        this.#degree = OPERATORS_SYMBOLS.SUB;
        return;
      }

      this.calculateDegree();
    }

    if (this.#isEnteringRadical) {
      if (nextOperator === OPERATORS.SUB && !this.#radical) {
        this.#radical = OPERATORS_SYMBOLS.SUB;
        return;
      }

      this.calculateRadical();
    }

    if (this.isError()) return;

    this.transformZeroDotToZero();

    if (this.#isWaitingForArgument) {
      const isOperatorSet = this.#operator != null;

      if (isOperatorSet && nextOperator === OPERATORS.SUB) {
        if (this.#currentInput !== OPERATORS_SYMBOLS.SUB) {
          this.#currentInput = OPERATORS_SYMBOLS.SUB;
          this.#isWaitingForArgument = false;
        }
      } else {
        this.#operator = nextOperator;
      }

      return;
    }

    if (this.#currentInput === OPERATORS_SYMBOLS.SUB) {
      this.#operator = nextOperator;
      this.#isWaitingForArgument = true;
      this.#currentInput = String(this.#accumulator);
      return;
    }

    try {
      this.#accumulator = this.#operator
        ? this.compute(this.#accumulator, this.#currentInput, this.#operator)
        : Number(this.#currentInput);
      this.#operator = nextOperator;
      this.#isWaitingForArgument = true;
      this.#currentInput = null;
    } catch {
      this.#currentInput = ERROR;
      this.#operator = null;
      this.#isWaitingForArgument = true;
      this.#accumulator = 0;
    }
  }

  equals() {
    if (this.#isEnteringDegree) {
      this.calculateDegree();
    }

    if (this.#isEnteringRadical) {
      this.calculateRadical();
    }

    if (
      this.isError() ||
      !this.#operator ||
      this.#isWaitingForArgument ||
      this.#currentInput === OPERATORS_SYMBOLS.SUB
    )
      return;

    try {
      this.#accumulator = this.compute(this.#accumulator, this.#currentInput, this.#operator);
      this.#currentInput = String(this.#accumulator);
      this.#operator = null;
      this.#isWaitingForArgument = true;
    } catch {
      this.#currentInput = ERROR;
      this.#operator = null;
      this.#isWaitingForArgument = true;
      this.#accumulator = 0;
    }
  }

  clearAll() {
    this.#currentInput = ZERO;
    this.#accumulator = 0;
    this.#operator = null;
    this.#isWaitingForArgument = true;
    this.#isEnteringDegree = false;
    this.#degree = null;
    this.#isEnteringRadical = false;
    this.#radical = null;
  }

  percent() {
    if (this.isError()) return;

    this.transformZeroDotToZero();

    if (this.#currentInput === OPERATORS_SYMBOLS.SUB && !!this.#operator) {
      this.#accumulator /= 100;
      this.#currentInput = String(this.#accumulator);
      this.#operator = null;
      this.#isWaitingForArgument = true;
      return;
    }

    const isOperationEntered = !!this.#operator && !this.#isWaitingForArgument;

    if (!isOperationEntered) {
      this.#accumulator = Number(this.#currentInput) / 100;
    } else {
      const currentInputPercent = Number(this.#currentInput) / 100;

      switch (this.#operator) {
        case OPERATORS.PLUS: {
          const percentValue = this.#accumulator * currentInputPercent;
          this.#accumulator = this.#accumulator + percentValue;
          break;
        }
        case OPERATORS.SUB: {
          const percentValue = this.#accumulator * currentInputPercent;
          this.#accumulator = this.#accumulator - percentValue;
          break;
        }
        case OPERATORS.MUL: {
          this.#accumulator = this.#accumulator * currentInputPercent;
          break;
        }
        case OPERATORS.DIV: {
          this.#accumulator = this.#accumulator / currentInputPercent;
          break;
        }
      }
    }

    this.#currentInput = normalizeResult(this.#accumulator);
    this.#operator = null;
    this.#isWaitingForArgument = true;
  }

  signChange() {
    if (this.isError() || (this.#operator && !this.#currentInput)) return;

    if (this.#currentInput === OPERATORS_SYMBOLS.SUB) {
      this.#currentInput = '';
      return;
    }

    if (this.#currentInput) {
      this.#currentInput = (Number(this.#currentInput) * -1).toString();
      return;
    }
  }

  toSquare() {
    this.toDegree();
    this.#degree = 2;
    return;
  }

  toCube() {
    this.toDegree();
    this.#degree = 3;
    return;
  }

  toDegree() {
    if (
      this.isError() ||
      (!!this.#operator && this.#isWaitingForArgument) ||
      this.#currentInput === OPERATORS_SYMBOLS.SUB
    )
      return;

    this.transformZeroDotToZero();

    this.#isEnteringDegree = true;
  }

  tenToDegree() {
    this.toDegree();
    this.#degree = this.#currentInput;
    this.#currentInput = 10;
  }

  inverse() {
    if (this.isError() || (!this.#currentInput && this.#operator)) return;

    if (this.#currentInput) {
      try {
        this.#currentInput = this.compute(1, this.#currentInput, OPERATORS.DIV);
      } catch {
        this.#currentInput = ERROR;
      }
    }
  }

  factorial() {
    if (this.isError() || (!this.#currentInput && this.#operator)) return;

    const currentInputNumber = Number(this.#currentInput);
    if (currentInputNumber > MAX_FACTORIAL_NUMBER) {
      this.#currentInput = ERROR;
      return;
    }

    if (this.#currentInput) {
      if (currentInputNumber < 0 || !Number.isInteger(currentInputNumber)) {
        this.#currentInput = ERROR;
      } else if (currentInputNumber === 0 || currentInputNumber === 1) {
        this.#currentInput = '1';
      } else {
        for (let i = 2; i < currentInputNumber; i++) {
          this.#currentInput = normalizeResult(this.#currentInput * i);
        }
      }
    }
  }

  squareRadical() {
    this.toRadical();
    this.#radical = 2;
  }

  cubeRadical() {
    this.toRadical();
    this.#radical = 3;
  }

  toRadical() {
    if (
      this.isError() ||
      (!!this.#operator && this.#isWaitingForArgument) ||
      this.#currentInput === OPERATORS_SYMBOLS.SUB
    )
      return;

    this.transformZeroDotToZero();

    this.#isEnteringRadical = true;
  }

  calculateDegree() {
    if (this.#degree !== OPERATORS_SYMBOLS.SUB) {
      this.#currentInput = normalizeResult(this.#currentInput ** this.#degree);
    }

    this.#isEnteringDegree = false;
    this.#degree = null;
  }

  calculateRadical() {
    if (this.#isEnteringRadical && !this.#radical) {
      this.#radical = 2;
    }

    const currentInputNumber = Number(this.#currentInput);

    if (this.#radical && isEven(this.#radical) && currentInputNumber < 0) {
      this.#currentInput = ERROR;
      return;
    }

    if (this.#radical !== OPERATORS_SYMBOLS.SUB) {
      if (currentInputNumber < 0) {
        this.#currentInput *= -1;
        this.#currentInput = this.#currentInput ** (1 / this.#radical);
        this.#currentInput = normalizeResult((this.#currentInput *= -1));
      } else {
        this.#currentInput = normalizeResult(this.#currentInput ** (1 / this.#radical));
      }
    }

    this.#isEnteringRadical = false;
    this.#radical = null;
  }

  memoryClear() {
    this.#memorizedValue = ZERO;
    this.isValueMemorized = false;
    this.updateMemoryRecallButtonStyle();
  }

  memoryPlus() {
    this.changeMemorizedValue(OPERATORS.PLUS);
  }

  memoryMinus() {
    this.changeMemorizedValue(OPERATORS.SUB);
  }

  memoryRecall() {
    if (!this.isValueMemorized) {
      return;
    }

    if (this.#operator && this.#isWaitingForArgument) {
      this.inputDigit(this.#memorizedValue.toString());
      return;
    }

    if (this.#accumulator && this.#operator && this.#currentInput) {
      this.equals();
    }

    if (
      this.#currentInput === ZERO ||
      this.#currentInput === `${ZERO}${DOT}` ||
      !this.#currentInput
    ) {
      this.#currentInput = this.#memorizedValue;
      this.#isWaitingForArgument = false;
    } else {
      this.setOperator(OPERATORS.MUL);
      this.inputDigit(this.#memorizedValue.toString());
    }
  }

  isError() {
    return this.#currentInput === ERROR;
  }

  transformZeroDotToZero() {
    if (this.#currentInput === `${ZERO}${DOT}`) {
      this.#currentInput = ZERO;
    }
  }

  changeMemorizedValue(operator) {
    if (this.isError() || (operator && this.#isWaitingForArgument)) {
      return;
    }

    if (
      ((this.#accumulator || this.#accumulator === 0) && operator && this.#currentInput) ||
      this.#isEnteringDegree ||
      this.#isEnteringRadical
    ) {
      this.equals();
    }

    this.#memorizedValue =
      operator === OPERATORS.SUB
        ? Number(this.#memorizedValue) - Number(this.#currentInput)
        : Number(this.#memorizedValue) + Number(this.#currentInput);

    this.isValueMemorized = true;
  }

  compute(a, b, operator) {
    a = Number(a);
    b = Number(b);

    switch (operator) {
      case OPERATORS.PLUS: {
        return normalizeResult(a + b);
      }
      case OPERATORS.SUB: {
        return normalizeResult(a - b);
      }
      case OPERATORS.MUL: {
        return normalizeResult(a * b);
      }
      case OPERATORS.DIV: {
        if (b === 0) {
          throw Error('Division by 0 is not allowed.');
        }

        return normalizeResult(a / b);
      }
      default: {
        return normalizeResult(b);
      }
    }
  }
}
