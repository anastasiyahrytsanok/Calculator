import { Command } from './Command.js';

export class Equals extends Command {
  constructor(calculator) {
    super(calculator);
  }

  execute() {
    this.calculator.equals();
  }
}
