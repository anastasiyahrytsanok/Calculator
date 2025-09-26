import { Command } from './Command.js';

export class Inverse extends Command {
  constructor(calculator) {
    super(calculator);
  }

  execute() {
    this.calculator.inverse();
  }
}
