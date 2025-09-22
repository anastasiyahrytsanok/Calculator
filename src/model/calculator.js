import { OPERATORS, OPERATORS_SYMBOLS, ERROR, ZERO, DOT, RADICAL_SYMBOL } from '../constants.js';

export function createCalculator() {
  let currentInput = ZERO,
    accumulator = ZERO,
    operator = null,
    isWaitingForArgument = true,
    isEnteringDegree = false,
    degree = null,
    isEnteringRadical = false,
    radical = null,
    memorizedValue = ZERO,
    isValueMemorized = false;

  const memoryRecallButton = document.querySelector('[data-cmd="memory-recall"]');

  function getExpression() {
    if (isError()) return ERROR;

    const operatorSymbol = toSymbol(operator);

    if (!operator) return getTransformedCurrentInput();

    if (isWaitingForArgument) return `${accumulator} ${operatorSymbol}`;

    if (currentInput === OPERATORS_SYMBOLS.SUB)
      return `${accumulator} ${operatorSymbol} ${OPERATORS_SYMBOLS.SUB}`;

    return `${accumulator} ${operatorSymbol} ${getTransformedCurrentInput()}`;

    function getTransformedCurrentInput() {
      if (isEnteringDegree && degree) {
        return `${currentInput}<sup>${degree}</sup>`;
      } else if (isEnteringRadical) {
        return radical === null
          ? `${RADICAL_SYMBOL}${currentInput}`
          : `<sup>${radical}</sup>${RADICAL_SYMBOL}${currentInput}`;
      } else {
        return currentInput;
      }
    }
  }

  //переписать
  function inputDigit(digit) {
    if (isEnteringDegree) {
      if (isError()) {
        degree = digit === DOT ? `${ZERO}${DOT}` : digit;
        accumulator = 0;
        operator = null;
        isWaitingForArgument = false;
        return;
      }

      if (digit === DOT && degree.toString().includes(DOT) && !operator) return;

      if (digit === DOT && degree === OPERATORS_SYMBOLS.SUB) {
        degree = OPERATORS_SYMBOLS.SUB + `${ZERO}${DOT}`;
        return;
      }

      if (isWaitingForArgument) {
        degree = digit === DOT ? `${ZERO}${DOT}` : digit;
        isWaitingForArgument = false;
      } else if (degree === ZERO && digit !== DOT) {
        degree = digit;
      } else degree = degree === null && digit !== DOT ? digit : degree + digit;

      return;
    }

    if (isEnteringRadical) {
      if (isError()) {
        radical = digit === DOT ? `${ZERO}${DOT}` : digit;
        accumulator = 0;
        operator = null;
        isWaitingForArgument = false;
        return;
      }

      if (digit === DOT && radical.toString().includes(DOT) && !operator) return;

      if (digit === DOT && radical === OPERATORS_SYMBOLS.SUB) {
        radical = OPERATORS_SYMBOLS.SUB + `${ZERO}${DOT}`;
        return;
      }

      if (isWaitingForArgument) {
        radical = digit === DOT ? `${ZERO}${DOT}` : digit;
        isWaitingForArgument = false;
      } else if (radical === ZERO && digit !== DOT) {
        radical = digit;
      } else radical = radical === null && digit !== DOT ? digit : radical + digit;

      return;
    }

    if (isError()) {
      currentInput = digit === DOT ? `${ZERO}${DOT}` : digit;
      accumulator = 0;
      operator = null;
      isWaitingForArgument = false;
      return;
    }

    if (digit === DOT && currentInput.toString().includes(DOT) && !operator) return;

    if (digit === DOT && currentInput === OPERATORS_SYMBOLS.SUB) {
      currentInput = OPERATORS_SYMBOLS.SUB + `${ZERO}${DOT}`;
      return;
    }

    if (isWaitingForArgument) {
      currentInput = digit === DOT ? `${ZERO}${DOT}` : digit;
      isWaitingForArgument = false;
    } else {
      currentInput = currentInput === ZERO && digit !== DOT ? digit : currentInput + digit;
    }
  }

  function setOperator(nextOperator) {
    if (isError()) return;

    if (isEnteringDegree) {
      if (nextOperator === OPERATORS.SUB && !degree) {
        degree = OPERATORS_SYMBOLS.SUB;
        return;
      }

      calculateDegree();
    }

    if (isEnteringRadical) {
      if (nextOperator === OPERATORS.SUB && !radical) {
        radical = OPERATORS_SYMBOLS.SUB;
        return;
      }

      calculateRadical();
    }

    transformZeroDotToZero();

    if (isWaitingForArgument) {
      const isOperatorSet = operator != null;

      if (isOperatorSet && nextOperator === OPERATORS.SUB) {
        if (currentInput !== OPERATORS_SYMBOLS.SUB) {
          currentInput = OPERATORS_SYMBOLS.SUB;
          isWaitingForArgument = false;
        }
      } else {
        operator = nextOperator;
      }
      return;
    }

    if (currentInput === OPERATORS_SYMBOLS.SUB) {
      operator = nextOperator;
      isWaitingForArgument = true;
      currentInput = String(accumulator);
      return;
    }

    if (operator === OPERATORS.DIV && currentInput === 0) {
      currentInput = ERROR;
      operator = null;
      isWaitingForArgument = true;
      accumulator = 0;
      return;
    }

    accumulator = operator ? compute(accumulator, currentInput, operator) : Number(currentInput);
    operator = nextOperator;
    isWaitingForArgument = true;
    currentInput = null;
  }

  function equals() {
    if (isEnteringDegree) {
      calculateDegree();
    }

    if (isEnteringRadical) {
      calculateRadical();
    }

    if (isError() || !operator || isWaitingForArgument || currentInput === OPERATORS_SYMBOLS.SUB)
      return;

    const x = currentInput;

    if (operator === OPERATORS.DIV && x === 0) {
      currentInput = ERROR;
      operator = null;
      isWaitingForArgument = true;
      accumulator = 0;
      return;
    }

    accumulator = compute(accumulator, x, operator);
    currentInput = String(accumulator);
    operator = null;
    isWaitingForArgument = true;
  }

  function clearAll() {
    currentInput = ZERO;
    accumulator = 0;
    operator = null;
    isWaitingForArgument = true;
    isEnteringDegree = false;
    degree = null;
    isEnteringRadical = false;
    radical = null;
  }

  function percent() {
    if (isError()) return;

    transformZeroDotToZero();

    // TODO: maybe just set ERROR in that case
    if (currentInput === OPERATORS_SYMBOLS.SUB && !!operator) {
      accumulator /= 100;
      currentInput = String(accumulator);
      operator = null;
      isWaitingForArgument = true;
      return;
    }

    const isOperationEntered = !!operator && !isWaitingForArgument;

    if (!isOperationEntered) {
      accumulator = Number(currentInput) / 100;
    } else {
      const currentInputPercent = Number(currentInput) / 100;

      switch (operator) {
        case OPERATORS.PLUS: {
          const percentValue = accumulator * currentInputPercent;
          accumulator = accumulator + percentValue;
          break;
        }
        case OPERATORS.SUB: {
          const percentValue = accumulator * currentInputPercent;
          accumulator = accumulator - percentValue;
          break;
        }
        case OPERATORS.MUL: {
          accumulator = accumulator * currentInputPercent;
          break;
        }
        case OPERATORS.DIV: {
          accumulator = accumulator / currentInputPercent;
          break;
        }
      }
    }

    currentInput = String(accumulator);
    operator = null;
    isWaitingForArgument = true;
  }

  function signChange() {
    if (isError() || (operator && !currentInput)) return;

    if (currentInput === OPERATORS_SYMBOLS.SUB) {
      currentInput = '';
      return;
    }

    if (currentInput) {
      currentInput = Number(currentInput) * -1;
      return;
    }
  }

  ///remove
  function printState() {
    console.log({ currentInput, accumulator, operator, isWaitingForArgument });
  }

  function toSquare() {
    toDegree();
    degree = 2;
    return;
  }

  function toCube() {
    toDegree();
    degree = 3;
    return;
  }

  function toDegree() {
    if (isError() || (!!operator && isWaitingForArgument) || currentInput === OPERATORS_SYMBOLS.SUB)
      return;

    transformZeroDotToZero();

    isEnteringDegree = true;
  }

  function tenToDegree() {
    toDegree();
    degree = currentInput;
    currentInput = 10;
  }

  function divideOne() {
    if (isError() || (!currentInput && operator)) return;

    if (Number(currentInput) === 0) {
      currentInput = ERROR;
      return;
    }

    if (currentInput) {
      currentInput = 1 / Number(currentInput);
      return;
    }
  }

  function factorial() {
    if (isError() || (!currentInput && operator)) return;

    if (currentInput) {
      if (Number(currentInput) < 0 || !Number.isInteger(Number(currentInput))) {
        currentInput = ERROR;
      } else if (Number(currentInput) === 0 || Number(currentInput) === 1) {
        currentInput = 1;
      } else {
        const initialValue = Number(currentInput);
        for (let i = 2; i < Number(initialValue); i++) {
          currentInput *= i;
        }
      }
    }
  }

  function squareRadical() {
    toRadical();
    radical = 2;
  }

  function cubeRadical() {
    toRadical();
    radical = 3;
  }

  function toRadical() {
    if (isError() || (!!operator && isWaitingForArgument) || currentInput === OPERATORS_SYMBOLS.SUB)
      return;

    transformZeroDotToZero();

    isEnteringRadical = true;
  }

  function calculateDegree() {
    if (degree !== OPERATORS_SYMBOLS.SUB) {
      currentInput = currentInput ** degree;
    }

    isEnteringDegree = false;
    degree = null;
  }

  function calculateRadical() {
    if (isEnteringRadical && !radical) {
      radical = 2;
    }

    if (radical && isEven(radical) && currentInput < ZERO) {
      currentInput = ERROR;
      return;
    }

    if (radical !== OPERATORS_SYMBOLS.SUB) {
      currentInput = Number((currentInput ** (1 / radical)).toFixed(12)).toString();
    }

    isEnteringRadical = false;
    radical = null;
  }

  function memoryClear() {
    memorizedValue = ZERO;
    isValueMemorized = false;
    updateMemoryRecallButtonStyle();
  }

  function memoryPlus() {
    changeMemorizedValue(OPERATORS.PLUS);
  }

  function memoryMinus() {
    changeMemorizedValue(OPERATORS.SUB);
  }

  function memoryRecall() {
    if (!isValueMemorized) {
      return;
    }

    if (operator && isWaitingForArgument) {
      inputDigit(memorizedValue.toString());
      return;
    }

    if (accumulator && operator && currentInput) {
      equals();
    }

    if (currentInput === ZERO || currentInput === `${ZERO}${DOT}` || !currentInput) {
      currentInput = memorizedValue;
    } else {
      setOperator(OPERATORS.MUL);
      inputDigit(memorizedValue.toString());
    }
  }

  function isError() {
    return currentInput === ERROR;
  }

  function transformZeroDotToZero() {
    if (currentInput === `${ZERO}${DOT}`) {
      currentInput = ZERO;
    }
  }

  function changeMemorizedValue(operator) {
    if (isError() || (operator && isWaitingForArgument)) {
      return;
    }
    if (
      ((accumulator || accumulator === Number(ZERO)) && operator && currentInput) ||
      degree ||
      isEnteringRadical
    ) {
      equals();
    }

    memorizedValue =
      operator === OPERATORS.SUB
        ? Number(memorizedValue) - Number(currentInput)
        : Number(memorizedValue) + Number(currentInput);

    isValueMemorized = true;
    updateMemoryRecallButtonStyle();
  }

  function updateMemoryRecallButtonStyle() {
    memoryRecallButton.classList = isValueMemorized ? 'active' : '';
  }

  return {
    getExpression,
    inputDigit,
    setOperator,
    equals,
    clearAll,
    percent,
    signChange,
    toSquare,
    toCube,
    toDegree,
    tenToDegree,
    divideOne,
    factorial,
    squareRadical,
    cubeRadical,
    toRadical,
    memoryClear,
    memoryPlus,
    memoryMinus,
    memoryRecall,
  };
}

function compute(a, b, operator) {
  a = Number(a);
  b = Number(b);
  if (operator === OPERATORS.PLUS) return a + b;
  if (operator === OPERATORS.SUB) return a - b;
  if (operator === OPERATORS.MUL) return a * b;
  if (operator === OPERATORS.DIV) return b === Number(ZERO) ? ERROR : a / b;
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
    case OPERATORS.PERCENT:
      return OPERATORS_SYMBOLS.PERCENT;
    default:
      return '';
  }
}

function isEven(number) {
  return Number.isInteger(Number(number)) && number % 2 === 0;
}
