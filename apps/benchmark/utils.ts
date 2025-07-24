export function calcAverage(value: number[]): number {
  if (value.length === 0) return 0;
  return value.reduce((acc, value) => acc + value, 0) / value.length;
}

export function calcX(a: number, b: number): number {
  if (a === b) return 0;
  const faster = Math.min(a, b);
  const slower = Math.max(a, b);
  const ratio = slower / faster;
  return Math.round(ratio * 100) / 100;
}
