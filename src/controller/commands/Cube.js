import { Command } from './Command.js';

export class Cube extends Command {
  constructor(calculator) {
    super(calculator);
  }

  execute() {
    this.calculator.toCube();
  }
}
