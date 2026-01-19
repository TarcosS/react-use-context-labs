import { useMemo, useState } from "react";
import { useTimeline } from "./useTimeline";
import type { TimelineEventType } from "./timeline";

const typeLabels: Record<TimelineEventType, string> = {
  render: "render",
  suspend: "suspend",
  resolve: "resolve",
  reject: "reject",
  transition: "transition",
  note: "note",
};

export function TimelinePanel() {
  const { events, clear } = useTimeline();
  const [filter, setFilter] = useState<TimelineEventType | "all">("all");

  const filtered = useMemo(() => {
    if (filter === "all") return events;
    return events.filter((e) => e.type === filter);
  }, [events, filter]);

  const withDeltas = useMemo(() => {
    if (filtered.length === 0) return [];

    // oldest -> newest
    const chronological = [...filtered].reverse();
    const base = chronological[0].ts;

    let prev = base;

    const enriched = chronological.map((e, idx) => {
      const deltaPrev = idx === 0 ? 0 : e.ts - prev;
      const deltaStart = e.ts - base;
      prev = e.ts;
      return { ...e, deltaPrev, deltaStart };
    });

    // back to newest -> oldest (UI order)
    return enriched.reverse();
  }, [filtered]);

  return (
    <section
      style={{
        border: "1px solid rgba(0,0,0,0.12)",
        borderRadius: 14,
        padding: 14,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <strong style={{ fontSize: 14 }}>Timeline</strong>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as TimelineEventType | "all")}
            style={{ padding: "6px 8px", borderRadius: 10 }}
          >
            <option value="all">all</option>
            <option value="render">render</option>
            <option value="suspend">suspend</option>
            <option value="resolve">resolve</option>
            <option value="reject">reject</option>
            <option value="transition">transition</option>
            <option value="note">note</option>
          </select>

          <button
            type="button"
            onClick={clear}
            style={{
              padding: "6px 10px",
              borderRadius: 10,
              border: "1px solid rgba(0,0,0,0.18)",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            Clear
          </button>
        </div>
      </header>

      <div style={{ fontSize: 12, opacity: 0.75 }}>
        Stub panel. Labs will push events (render/suspend/resolve/reject) here.
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 280, overflow: "auto" }}>
        {withDeltas.length === 0 ? (
          <div style={{ fontSize: 12, opacity: 0.7 }}>No events yet.</div>
        ) : (
          withDeltas.map((e) => (
            <div
              key={e.id}
              style={{
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: 12,
                padding: "8px 10px",
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <span style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                  {typeLabels[e.type]}
                </span>

                <span style={{ display: "flex", gap: 10, opacity: 0.75, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                  <span>+{e.deltaPrev.toFixed(1)}ms</span>
                  <span>({e.deltaStart.toFixed(1)}ms)</span>
                  <span>{Math.round(e.ts)}ms</span>
                </span>
              </div>
              <div style={{ fontSize: 13 }}>{e.label}</div>
              {e.meta ? (
                <pre
                  style={{
                    margin: 0,
                    fontSize: 11,
                    opacity: 0.75,
                    overflow: "auto",
                    maxHeight: 120,
                  }}
                >
                  {JSON.stringify(e.meta, null, 2)}
                </pre>
              ) : null}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
