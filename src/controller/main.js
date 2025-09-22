import { createCalculator } from '../model/calculator.js';
import { COMMANDS } from '../constants.js';
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
import { DivideOne } from './commands/DivideOne.js';
import { Factorial } from './commands/Factorial.js';
import { SquareRadical } from './commands/SquareRadical.js';
import { CubeRadical } from './commands/CubeRadical.js';
import { Radical } from './commands/Radical.js';
import { MemoryClear } from './commands/MemoryClear.js';
import { MemoryPlus } from './commands/MemoryPlus.js';
import { MemoryMinus } from './commands/MemoryMinus.js';
import { MemoryRecall } from './commands/MemoryRecall.js';

export function initController() {
  const calculator = createCalculator();

  const expressionElement = document.querySelector('.calc__exp');

  const render = () => {
    if (expressionElement) {
      expressionElement.innerHTML = calculator.getExpression();
    }
  };

  render();

  document.querySelector('.calc__keys').addEventListener('click', (e) => {
    const button = e.target.closest('button');
    if (!button) return;
    const { cmd, arg } = button.dataset;

    if (cmd === COMMANDS.DIGIT) return executeCommand(new Digit(calculator, String(arg)));
    if (cmd === COMMANDS.DOT) return executeCommand(new Dot(calculator));
    if (cmd === COMMANDS.OP) return executeCommand(new Operator(calculator, arg));
    if (cmd === COMMANDS.EQ) return executeCommand(new Equals(calculator));
    if (cmd === COMMANDS.CLEAR) return executeCommand(new Clear(calculator));
    if (cmd === COMMANDS.PERCENT) return executeCommand(new Percent(calculator));
    if (cmd === COMMANDS.SIGN_CHANGE) return executeCommand(new SignChange(calculator));
    if (cmd === COMMANDS.SQUARE) return executeCommand(new Square(calculator));
    if (cmd === COMMANDS.CUBE) return executeCommand(new Cube(calculator));
    if (cmd === COMMANDS.DEGREE) return executeCommand(new Degree(calculator));
    if (cmd === COMMANDS.TEN_TO_DEGREE) return executeCommand(new TenToDegree(calculator));
    if (cmd === COMMANDS.DIVIDE_ONE) return executeCommand(new DivideOne(calculator));
    if (cmd === COMMANDS.FACTORIAL) return executeCommand(new Factorial(calculator));
    if (cmd === COMMANDS.SQUARE_RADICAL) return executeCommand(new SquareRadical(calculator));
    if (cmd === COMMANDS.CUBE_RADICAL) return executeCommand(new CubeRadical(calculator));
    if (cmd === COMMANDS.Y_RADICAL) return executeCommand(new Radical(calculator));
    if (cmd === COMMANDS.MEMORY_CLEAR) return executeCommand(new MemoryClear(calculator));
    if (cmd === COMMANDS.MEMORY_PLUS) return executeCommand(new MemoryPlus(calculator));
    if (cmd === COMMANDS.MEMORY_MINUS) return executeCommand(new MemoryMinus(calculator));
    if (cmd === COMMANDS.MEMORY_RECALL) return executeCommand(new MemoryRecall(calculator));

    function executeCommand(command) {
      command.execute();
      render();
    }
  });
}
