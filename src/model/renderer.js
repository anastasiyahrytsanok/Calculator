import { fitText } from '../utils';

export class Renderer {
  #calculator;

  constructor(calculator) {
    this.#calculator = calculator;
  }

  render() {
    const expressionElement = document.querySelector('.calc__expression');

    if (expressionElement) {
      expressionElement.innerHTML = this.#calculator.getExpression();
    }

    const display = document.querySelector('.calc__display');
    const textElement = display.querySelector('.calc__expression');

    fitText(display, textElement, 20, 50);

    if (this.#calculator.isValueMemorized) {
      this.updateMemoryRecallButtonStyle();
    }
  }

  updateMemoryRecallButtonStyle() {
    const memoryRecallButton = document.querySelector('[data-cmd="memory-recall"]');
    memoryRecallButton.classList = this.#calculator.isValueMemorized ? 'active' : '';
  }
}
