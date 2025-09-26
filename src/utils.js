import {
  OPERATORS,
  ERROR,
  OPERATORS_SYMBOLS,
  PERCENT,
  DEFAULT_DECIMAL_PLACES,
} from './constants.js';

export function toSymbol(operator) {
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
      return PERCENT;
    default:
      return '';
  }
}

export function isEven(number) {
  return Number.isInteger(Number(number)) && number % 2 === 0;
}

export function normalizeResult(number) {
  if (Number.isNaN(number) || number === Infinity || number === -Infinity) return ERROR;
  return Number(number.toFixed(DEFAULT_DECIMAL_PLACES)).toString();
}

/**
 * Finds the largest font size (via binary search) that lets `textEl` fit within
 * `container` width, then sets `textEl.style.fontSize` to that size.
 *
 * @param {HTMLElement} container - Bounding element (uses its clientWidth).
 * @param {HTMLElement} textEl - Text node to resize (measured via scrollWidth).
 * @param {number} [minPx=20] - Minimum font size in px.
 * @param {number} [maxPx=50] - Maximum font size in px.
 * @returns {void}
 */

export function fitText(container, textEl, minPx = 20, maxPx = 50) {
  textEl.style.fontSize = maxPx + 'px';
  let lowerBound = minPx,
    higherBound = maxPx,
    best = minPx;

  while (lowerBound <= higherBound) {
    const mid = Math.floor((lowerBound + higherBound) / 2);
    textEl.style.fontSize = mid + 'px';
    if (textEl.scrollWidth <= container.clientWidth) {
      best = mid;
      lowerBound = mid + 1;
    } else {
      higherBound = mid - 1;
    }
  }
  textEl.style.fontSize = best + 'px';
}
