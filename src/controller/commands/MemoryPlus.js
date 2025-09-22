import { Command } from './Command.js';

export class MemoryPlus extends Command {
  constructor(calculator) {
    super(calculator);
  }

  execute() {
    this.calculator.memoryPlus();
  }
}