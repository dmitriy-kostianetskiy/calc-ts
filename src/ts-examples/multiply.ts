function multiply(a: number, b: number): number {
  if (b === 0) {
    return 0;
  }

  const s = a - 1;

  if (s < 0) {
    return 0;
  }

  return b + multiply(s, b);
}
