import { Suspense, use, useEffect } from "react";
import { SuspendFallback } from "../lab2/SuspendFallback";
import type { ReportDTO } from "./rejectApi";
import { timeline } from "../../observability/timeline";

export function ReportPane({ promise, requestId }: { promise: Promise<ReportDTO>; requestId: number }) {
  return (
    <Suspense fallback={<SuspendFallback label={`Lab4: report requestId=${requestId}`} />}>
      <Inner promise={promise} requestId={requestId} />
    </Suspense>
  );
}

function Inner({ promise, requestId }: { promise: Promise<ReportDTO>; requestId: number }) {
  useEffect(() => {
    timeline.push("transition", "Lab4 (use): reading report promise", { requestId });
  }, [requestId]);

  const data = use(promise);

  useEffect(() => {
    timeline.push("resolve", "Lab4 (use): report resolved", { requestId });
  }, [requestId]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Row k="title" v={data.title} />
      <Row k="status" v={data.status} />
      <Row k="requestId" v={String(data.requestId)} />
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ display: "flex", gap: 10 }}>
      <span style={{ width: 90, opacity: 0.7 }}>{k}</span>
      <code>{v}</code>
    </div>
  );
}
