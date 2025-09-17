export function createInvoker(calc, onAfter) {
  return {
    run(command) {
      command.execute(calc);
      onAfter && onAfter();
    },
  };
}
