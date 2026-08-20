export default function Loading() {
  return (
    <div className="study-page space-y-5" aria-busy="true" aria-label="Äang táº£i dá»¯ liá»‡u há»c táº­p">
      <div className="h-24 animate-pulse rounded-2xl bg-[var(--panel-soft)]" />
      <div className="study-panel h-80 animate-pulse" />
    </div>
  );
}
