export class CommandExecutor {
  #renderer;

  constructor(renderer) {
    this.#renderer = renderer;
  }

  executeCommand(command) {
    command.execute();
    this.#renderer.render();
  }
}
