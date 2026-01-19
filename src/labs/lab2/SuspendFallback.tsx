import { useEffect } from "react";
import { timeline } from "../../observability/timeline";

export function SuspendFallback({ label }: { label: string }) {
  useEffect(() => {
    timeline.push("suspend", `Lab2: Suspense fallback mounted (${label})`);
    return () => {
      timeline.push("note", `Lab2: Suspense fallback unmounted (${label})`);
    };
  }, [label]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <strong>Loading…</strong>
      <div style={{ opacity: 0.8, fontSize: 13 }}>
        This is rendered by <code>&lt;Suspense fallback&gt;</code>.
      </div>
    </div>
  );
}
