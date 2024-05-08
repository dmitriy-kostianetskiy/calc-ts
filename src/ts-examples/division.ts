function division(
  a: number,
  b: number,
  result = 0,
): number {
  if (b === 0) {
    throw new Error('Division by zero');
  }

  if (b === 1) {
    return a;
  }

  const s = a - b;

  if (s < 0) {
    return result;
  }

  return division(s, b, result + 1);
}
