import { Command } from './Command.js';

export class Degree extends Command {
  constructor(calculator) {
    super(calculator);
  }

  execute() {
    this.calculator.toDegree();
  }
}