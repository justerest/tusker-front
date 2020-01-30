export function assert(condition: unknown, message: string = 'Assertion Error'): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}
