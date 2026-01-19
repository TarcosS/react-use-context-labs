import { useMemo, useState } from "react";
import { LabShell } from "./LabShell";
import { LegacyEffectPane } from "./lab2/LegacyEffectPane";
import { UsePromisePane } from "./lab2/UsePromisePane";
import { fetchUser } from "./lab2/fakeApi";
import { timeline } from "../observability/timeline";

export function Lab2() {
  const [requestId, setRequestId] = useState(1);
  const [shouldFail, setShouldFail] = useState(false);

  const promise = useMemo(() => {
    // Create a new promise per requestId (and failure toggle)
    return fetchUser({ requestId, shouldFail });
  }, [requestId, shouldFail]);

  return (
    <LabShell
      title="Lab 2 — Promise + Suspense"
      description="Side-by-side comparison: legacy useEffect orchestration vs render-time use(promise) with Suspense fallback ownership."
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Controls
          requestId={requestId}
          shouldFail={shouldFail}
          onRefetch={() => {
            setRequestId((x) => x + 1);
            timeline.push("transition", "Lab2: refetch()", { nextRequestId: requestId + 1 });
          }}
          onToggleFail={() => {
            setShouldFail((v) => !v);
            timeline.push("transition", "Lab2: toggleFail()", { next: !shouldFail });
          }}
        />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <LegacyEffectPane requestId={requestId} shouldFail={shouldFail} />

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <UsePromisePane promise={promise} requestId={requestId} />

            {shouldFail ? (
              <div style={{ fontSize: 12, opacity: 0.75 }}>
                Note: the <code>use(promise)</code> path throws on rejection. We will handle this
                properly in Lab 4 using an ErrorBoundary (so “failure UI” is a contract, not a crash).
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </LabShell>
  );
}

function Controls({
  requestId,
  shouldFail,
  onRefetch,
  onToggleFail,
}: {
  requestId: number;
  shouldFail: boolean;
  onRefetch: () => void;
  onToggleFail: () => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        flexWrap: "wrap",
        alignItems: "center",
        border: "1px solid rgba(0,0,0,0.10)",
        borderRadius: 14,
        padding: 12,
      }}
    >
      <strong style={{ marginRight: 8 }}>Controls</strong>

      <button type="button" onClick={onRefetch} style={btn}>
        Refetch (requestId={requestId})
      </button>

      <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
        <input type="checkbox" checked={shouldFail} onChange={onToggleFail} />
        Simulate failure
      </label>

      <span style={{ fontSize: 12, opacity: 0.75 }}>
        Both panes use the same params; only consumption model differs.
      </span>
    </div>
  );
}

const btn: React.CSSProperties = {
  padding: "8px 10px",
  borderRadius: 10,
  border: "1px solid rgba(0,0,0,0.18)",
  background: "transparent",
  cursor: "pointer",
};
