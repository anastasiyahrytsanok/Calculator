import { Command } from './Command.js';

export class DivideOne extends Command {
  constructor(calculator) {
    super(calculator);
  }

  execute() {
    this.calculator.divideOne();
  }
}
