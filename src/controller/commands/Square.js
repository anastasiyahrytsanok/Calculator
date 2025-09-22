import { Command } from './Command.js';

export class Square extends Command {
  constructor(calculator) {
    super(calculator);
  }

  execute() {
    this.calculator.toSquare();
  }
}