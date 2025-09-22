import { Command } from './Command.js';

export class SignChange extends Command {
  constructor(calculator) {
    super(calculator);
  }

  execute() {
    this.calculator.signChange();
  }
}