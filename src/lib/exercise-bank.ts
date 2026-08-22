export function rotateExerciseBank<T>(
  orderedBank: readonly T[],
  dateKey: string,
  requestedLimit: number,
  round = 0,
): T[] {
  if (orderedBank.length === 0) return [];
  const limit = Math.min(orderedBank.length, Math.max(1, Math.trunc(requestedLimit)));
  const numericDate = Number(dateKey.replaceAll("-", ""));
  const dateOffset = Number.isSafeInteger(numericDate)
    ? Math.abs(numericDate - 1) % orderedBank.length
    : 0;
  const totalOffset = (dateOffset + Math.max(0, Math.trunc(round)) * limit) % orderedBank.length;
  return [...orderedBank.slice(totalOffset), ...orderedBank.slice(0, totalOffset)].slice(0, limit);
}
