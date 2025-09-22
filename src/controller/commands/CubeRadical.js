import { Command } from './Command.js';

export class CubeRadical extends Command {
  constructor(calculator) {
    super(calculator);
  }

  execute() {
    this.calculator.cubeRadical();
  }
}