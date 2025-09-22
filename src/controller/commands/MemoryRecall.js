import { Command } from './Command.js';

export class MemoryRecall extends Command {
  constructor(calculator) {
    super(calculator);
  }

  execute() {
    this.calculator.memoryRecall();
  }
}