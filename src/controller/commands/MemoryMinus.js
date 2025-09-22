import { Command } from './Command.js';

export class MemoryMinus extends Command {
  constructor(calculator) {
    super(calculator);
  }

  execute() {
    this.calculator.memoryMinus();
  }
}