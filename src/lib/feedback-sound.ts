export function playAnswerFeedback(correct: boolean): void {
  if (typeof window === "undefined") return;
  const AudioContextClass = window.AudioContext
    ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return;

  const context = new AudioContextClass();
  const gain = context.createGain();
  gain.gain.setValueAtTime(0.0001, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(correct ? 0.11 : 0.075, context.currentTime + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + (correct ? 0.32 : 0.24));
  gain.connect(context.destination);

  const frequencies = correct ? [880, 1174.66] : [220, 164.81];
  frequencies.forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    oscillator.type = correct ? "sine" : "triangle";
    oscillator.frequency.value = frequency;
    oscillator.connect(gain);
    const start = context.currentTime + index * (correct ? 0.075 : 0.045);
    oscillator.start(start);
    oscillator.stop(start + (correct ? 0.2 : 0.16));
  });

  window.setTimeout(() => void context.close(), 500);
}
