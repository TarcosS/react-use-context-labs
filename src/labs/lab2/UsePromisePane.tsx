import { Suspense, use, useEffect } from "react";
import type { UserDTO } from "./fakeApi";
import { SuspendFallback } from "./SuspendFallback";
import { timeline } from "../../observability/timeline";

export function UsePromisePane({
  promise,
  requestId,
}: {
  promise: Promise<UserDTO>;
  requestId: number;
}) {
  return (
    <PaneShell
      title="Render-time: use(promise) + Suspense"
      subtitle="Suspense boundary owns loading UI; component reads value"
    >
      <Suspense fallback={<SuspendFallback label={`use(promise) requestId=${requestId}`} />}>
        <Inner promise={promise} requestId={requestId} />
      </Suspense>
    </PaneShell>
  );
}

function Inner({ promise, requestId }: { promise: Promise<UserDTO>; requestId: number }) {
  useEffect(() => {
    timeline.push("transition", "Lab2 (use): reading promise", { requestId });
  }, [requestId]);

  // If promise is pending, this will suspend -> Suspense fallback renders.
  // If promise is rejected, it will throw -> handled later in Lab4 with ErrorBoundary.
  const data = use(promise);

  useEffect(() => {
    timeline.push("resolve", "Lab2 (use): promise resolved (value read)", { requestId });
  }, [requestId]);

  return <UserBlock data={data} />;
}

function PaneShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <strong style={{ fontSize: 14 }}>{title}</strong>
        <div style={{ fontSize: 12, opacity: 0.75 }}>{subtitle}</div>
      </div>

      <div
        style={{
          border: "1px solid rgba(0,0,0,0.10)",
          borderRadius: 14,
          padding: 14,
          minHeight: 140,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          justifyContent: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function UserBlock({ data }: { data: UserDTO }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <Row k="id" v={data.id} />
      <Row k="name" v={data.name} />
      <Row k="role" v={data.role} />
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
