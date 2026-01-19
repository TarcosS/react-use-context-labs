import { useMemo, useState } from "react";
import { LabShell } from "./LabShell";
import { ErrorBoundary } from "../shared/ErrorBoundary";
import { fetchReport } from "./lab4/rejectApi";
import { ReportPane } from "./lab4/ReportPane";
import { timeline } from "../observability/timeline";

export function Lab4() {
  const [requestId, setRequestId] = useState(1);
  const [shouldFail, setShouldFail] = useState(true);

  const promise = useMemo(() => fetchReport(requestId, shouldFail), [requestId, shouldFail]);

  return (
    <LabShell
      title="Lab 4 — Rejection + ErrorBoundary"
      description="Rejected promises should map to a failure UI contract. ErrorBoundary owns the failure UI; Suspense owns the loading UI."
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Controls
          requestId={requestId}
          shouldFail={shouldFail}
          onRefetch={() => {
            setRequestId((x) => x + 1);
            timeline.push("transition", "Lab4: refetch()", { nextRequestId: requestId + 1 });
          }}
          onToggleFail={() => {
            setShouldFail((v) => !v);
            timeline.push("transition", "Lab4: toggleFail()", { next: !shouldFail });
          }}
        />

        <div
          style={{
            border: "1px solid rgba(0,0,0,0.10)",
            borderRadius: 14,
            padding: 14,
          }}
        >
          <ErrorBoundary
            label="Lab4: report boundary"
            fallback={({ error, reset }) => (
              <FailureCard
                error={error}
                onRetry={() => {
                  reset();
                  setRequestId((x) => x + 1);
                }}
              />
            )}
          >
            <ReportPane promise={promise} requestId={requestId} />
          </ErrorBoundary>
        </div>

        <div style={{ fontSize: 12, opacity: 0.75 }}>
          Takeaway: with <code>use(promise)</code>, a rejected promise is not “random crash”. It is a
          predictable signal routed into an ErrorBoundary, just like loading is routed into Suspense.
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
        With ErrorBoundary, failure becomes a contract.
      </span>
    </div>
  );
}

function FailureCard({ error, onRetry }: { error: Error; onRetry: () => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <strong>Failed</strong>
      <div style={{ fontSize: 12, opacity: 0.75 }}>{error.message}</div>
      <button type="button" onClick={onRetry} style={btn}>
        Retry (reset boundary + new request)
      </button>
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
