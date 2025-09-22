import { Command } from './Command.js';

export class Radical extends Command {
  constructor(calculator) {
    super(calculator);
  }

  execute() {
    this.calculator.toRadical();
  }
}
