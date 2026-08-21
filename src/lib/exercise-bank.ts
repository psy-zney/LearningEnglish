export function rotateExerciseBank<T>(
  orderedBank: readonly T[],
  dateKey: string,
  requestedLimit: number,
): T[] {
  if (orderedBank.length === 0) return [];
  const limit = Math.min(orderedBank.length, Math.max(1, Math.trunc(requestedLimit)));
  const numericDate = Number(dateKey.replaceAll("-", ""));
  const offset = Number.isSafeInteger(numericDate)
    ? Math.abs(numericDate - 1) % orderedBank.length
    : 0;
  return [...orderedBank.slice(offset), ...orderedBank.slice(0, offset)].slice(0, limit);
}
