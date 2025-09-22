import { Command } from './Command.js';

export class SquareRadical extends Command {
  constructor(calculator) {
    super(calculator);
  }

  execute() {
    this.calculator.squareRadical();
  }
}