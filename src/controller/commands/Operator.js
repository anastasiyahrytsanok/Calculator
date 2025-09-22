import { Command } from './Command.js';

export class Operator extends Command {
  constructor(calculator, operator) {
    super(calculator);
    this.operator = operator;
  }

  execute() {
    this.calculator.setOperator(this.operator);
  }
}
