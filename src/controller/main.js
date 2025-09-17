import { createCalculator } from '../model/calculator.js';
import { createInvoker } from './invoker.js';
import { Digit, Dot, Operator, Equals, Clear, Percent } from './commands.js';
import { COMMANDS } from '../constants.js';

export function initController() {
  const calc = createCalculator();

  const expressionElement = document.querySelector('.calc__exp');
  const render = () => {
    if (expressionElement) expressionElement.textContent = calc.getExpression();
  };

  const invoker = createInvoker(calc, render);
  render();

  document.querySelector('.calc__keys').addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const { cmd, arg } = btn.dataset;

    if (cmd === COMMANDS.DIGIT) return invoker.run(Digit(String(arg)));
    if (cmd === COMMANDS.DOT) return invoker.run(Dot());
    if (cmd === COMMANDS.OP) return invoker.run(Operator(arg));
    if (cmd === COMMANDS.EQ) return invoker.run(Equals());
    if (cmd === COMMANDS.CLEAR) return invoker.run(Clear());
    if (cmd === COMMANDS.PERCENT) return invoker.run(Percent());
  });
}
