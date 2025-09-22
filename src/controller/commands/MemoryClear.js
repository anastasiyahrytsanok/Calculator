import { Command } from './Command.js';

export class MemoryClear extends Command {
  constructor(calculator) {
    super(calculator);
  }

  execute() {
    this.calculator.memoryClear();
  }
}
