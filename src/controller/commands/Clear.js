import { Command } from './Command.js';

export class Clear extends Command {
  constructor(calculator) {
    super(calculator);
  }

  execute() {
    this.calculator.clearAll();
  }
}