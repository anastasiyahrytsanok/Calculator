import { Command } from './Command.js';

export class Digit extends Command {
  digit;

  constructor(calculator, digit) {
    super(calculator);
    this.digit = digit;
  }

  execute() {
    this.calculator.inputDigit(this.digit);
  }
}
