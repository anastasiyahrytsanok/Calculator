import { Command } from './Command.js';
import { DOT } from '../../constants.js';

export class Dot extends Command {
  constructor(calculator) {
    super(calculator);
  }

  execute() {
    this.calculator.inputDigit(DOT);
  }
}
