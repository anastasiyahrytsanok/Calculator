import { Command } from './Command.js';

export class Factorial extends Command {
  constructor(calculator) {
    super(calculator);
  }

  execute() {
    this.calculator.factorial();
  }
}
