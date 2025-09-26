export const COMMANDS = {
  DIGIT: 'digit',
  DOT: 'dot',
  OP: 'op',
  EQ: 'eq',
  CLEAR: 'clear',
  PERCENT: 'percent',
  SIGN_CHANGE: 'sign-change',
  SQUARE: 'square',
  CUBE: 'cube',
  DEGREE: 'degree',
  TEN_TO_DEGREE: 'ten-to-degree',
  DIVIDE_ONE: 'divide-one',
  FACTORIAL: 'factorial',
  SQUARE_RADICAL: 'square-radical',
  CUBE_RADICAL: 'cube-radical',
  Y_RADICAL: 'y-radical',
  MEMORY_CLEAR: 'memory-clear',
  MEMORY_PLUS: 'memory-plus',
  MEMORY_MINUS: 'memory-minus',
  MEMORY_RECALL: 'memory-recall',
};

export const OPERATORS_SYMBOLS = {
  PLUS: '+',
  SUB: '-',
  MUL: '×',
  DIV: '÷',
};

export const OPERATORS = {
  PLUS: 'add',
  SUB: 'sub',
  MUL: 'mul',
  DIV: 'div',
  PERCENT: 'percent',
  SIGN_CHANGE: 'sign-change',
};

export const KEYBOARD_ALIASES = {
  '+': OPERATORS.PLUS,
  '-': OPERATORS.SUB,
  '*': OPERATORS.MUL,
  '/': OPERATORS.DIV,
};

export const THEME_BUTTON_TEXT = {
  LIGHT: 'Light',
  DARK: 'Dark',
};

export const PERCENT = '%';
export const ERROR = 'Error';
export const ZERO = '0';
export const DOT = '.';
export const RADICAL_SYMBOL = '&#8730;';
export const EQUALS_SIGN = '=';
export const ENTER = 'Enter';

//limit from my desktop calculator
export const MAX_NUMBER_LENGTH = 32;

//170 is the largest n for which n! remains finite
export const MAX_FACTORIAL_NUMBER = 170;

//default value for calculators
export const DEFAULT_DECIMAL_PLACES = 12;
