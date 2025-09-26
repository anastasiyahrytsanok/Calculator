import { CreateCalculator } from '../model/calculator.js';
import {
  COMMANDS,
  DOT,
  KEYBOARD_ALIASES,
  EQUALS_SIGN,
  ENTER,
  THEME_BUTTON_TEXT,
} from '../constants.js';
import { Digit } from './commands/Digit.js';
import { Dot } from './commands/Dot.js';
import { Operator } from './commands/Operator.js';
import { Equals } from './commands/Equals.js';
import { Clear } from './commands/Clear.js';
import { Percent } from './commands/Percent.js';
import { SignChange } from './commands/SignChange.js';
import { Square } from './commands/Square.js';
import { Cube } from './commands/Cube.js';
import { Degree } from './commands/Degree.js';
import { TenToDegree } from './commands/TenToDegree.js';
import { Inverse } from './commands/Inverse.js';
import { Factorial } from './commands/Factorial.js';
import { SquareRadical } from './commands/SquareRadical.js';
import { CubeRadical } from './commands/CubeRadical.js';
import { Radical } from './commands/Radical.js';
import { MemoryClear } from './commands/MemoryClear.js';
import { MemoryPlus } from './commands/MemoryPlus.js';
import { MemoryMinus } from './commands/MemoryMinus.js';
import { MemoryRecall } from './commands/MemoryRecall.js';
import { Renderer } from '../model/renderer.js';
import { CommandExecutor } from '../model/commandExecutor.js';

export function initController() {
  const calculator = new CreateCalculator();
  const renderer = new Renderer(calculator);
  const commandExecutor = new CommandExecutor(renderer);

  registerKeyEvents(calculator, commandExecutor);
  registerCalculatorButtonClickHandlers(commandExecutor, calculator);
  registerThemeChangeHandler();

  renderer.render();
}

function registerCalculatorButtonClickHandlers(commandExecutor, calculator) {
  document.querySelector('.calc__keys').addEventListener('click', (e) => {
    const button = e.target.closest('button');
    if (!button) return;
    const { cmd, arg } = button.dataset;

    if (cmd === COMMANDS.DIGIT) {
      return commandExecutor.executeCommand(new Digit(calculator, String(arg)));
    }

    if (cmd === COMMANDS.DOT) {
      return commandExecutor.executeCommand(new Dot(calculator));
    }

    if (cmd === COMMANDS.OP) {
      return commandExecutor.executeCommand(new Operator(calculator, arg));
    }

    if (cmd === COMMANDS.EQ) {
      return commandExecutor.executeCommand(new Equals(calculator));
    }

    if (cmd === COMMANDS.CLEAR) {
      return commandExecutor.executeCommand(new Clear(calculator));
    }

    if (cmd === COMMANDS.PERCENT) {
      return commandExecutor.executeCommand(new Percent(calculator));
    }

    if (cmd === COMMANDS.SIGN_CHANGE) {
      return commandExecutor.executeCommand(new SignChange(calculator));
    }

    if (cmd === COMMANDS.SQUARE) {
      return commandExecutor.executeCommand(new Square(calculator));
    }

    if (cmd === COMMANDS.CUBE) {
      return commandExecutor.executeCommand(new Cube(calculator));
    }

    if (cmd === COMMANDS.DEGREE) {
      return commandExecutor.executeCommand(new Degree(calculator));
    }

    if (cmd === COMMANDS.TEN_TO_DEGREE) {
      return commandExecutor.executeCommand(new TenToDegree(calculator));
    }

    if (cmd === COMMANDS.DIVIDE_ONE) {
      return commandExecutor.executeCommand(new Inverse(calculator));
    }

    if (cmd === COMMANDS.FACTORIAL) {
      return commandExecutor.executeCommand(new Factorial(calculator));
    }

    if (cmd === COMMANDS.SQUARE_RADICAL) {
      return commandExecutor.executeCommand(new SquareRadical(calculator));
    }

    if (cmd === COMMANDS.CUBE_RADICAL) {
      return commandExecutor.executeCommand(new CubeRadical(calculator));
    }

    if (cmd === COMMANDS.Y_RADICAL) {
      return commandExecutor.executeCommand(new Radical(calculator));
    }

    if (cmd === COMMANDS.MEMORY_CLEAR) {
      return commandExecutor.executeCommand(new MemoryClear(calculator));
    }

    if (cmd === COMMANDS.MEMORY_PLUS) {
      return commandExecutor.executeCommand(new MemoryPlus(calculator));
    }

    if (cmd === COMMANDS.MEMORY_MINUS) {
      return commandExecutor.executeCommand(new MemoryMinus(calculator));
    }

    if (cmd === COMMANDS.MEMORY_RECALL) {
      return commandExecutor.executeCommand(new MemoryRecall(calculator));
    }
  });
}

function registerKeyEvents(calculator, commandExecutor) {
  document.addEventListener('keydown', (event) => {
    if (Number.isInteger(parseInt(event.key))) {
      commandExecutor.executeCommand(new Digit(calculator, event.key));
      return;
    }

    if (event.key === DOT) {
      commandExecutor.executeCommand(new Dot(calculator));
      return;
    }

    if (Object.keys(KEYBOARD_ALIASES).includes(event.key)) {
      commandExecutor.executeCommand(new Operator(calculator, KEYBOARD_ALIASES[event.key]));
      return;
    }

    if (event.key === EQUALS_SIGN || event.key === ENTER) {
      event.preventDefault();
      commandExecutor.executeCommand(new Equals(calculator));
      return;
    }
  });
}

function registerThemeChangeHandler() {
  const themeButton = document.querySelector('.page__theme');
  const page = document.documentElement;

  themeButton.addEventListener('click', () => {
    if (page.hasAttribute('data-theme')) {
      page.removeAttribute('data-theme');
      themeButton.textContent = THEME_BUTTON_TEXT.DARK;
    } else {
      page.setAttribute('data-theme', THEME_BUTTON_TEXT.DARK.toLowerCase());
      themeButton.textContent = THEME_BUTTON_TEXT.LIGHT;
    }
  });
}
