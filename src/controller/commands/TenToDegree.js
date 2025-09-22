import { Command } from './Command.js';

export class TenToDegree extends Command {
  constructor(calculator) {
    super(calculator);
  }

  execute() {
    this.calculator.tenToDegree();
  }
}