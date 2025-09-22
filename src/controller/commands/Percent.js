import { Command } from './Command.js';

export class Percent extends Command {
  constructor(calculator) {
    super(calculator);
  }

  execute() {
    this.calculator.percent();
  }
}
