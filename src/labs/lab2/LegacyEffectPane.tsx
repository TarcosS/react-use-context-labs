import { useEffect, useState } from "react";
import type { UserDTO } from "./fakeApi";
import { fetchUser } from "./fakeApi";
import { timeline } from "../../observability/timeline";

export function LegacyEffectPane({
  requestId,
  shouldFail,
}: {
  requestId: number;
  shouldFail: boolean;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [data, setData] = useState<UserDTO | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    setStatus("loading");
    setData(null);
    setError(null);

    timeline.push("transition", "Lab2 (legacy): start request", { requestId, shouldFail });

    fetchUser({ requestId, shouldFail })
      .then((res) => {
        if (!active) return;
        setData(res);
        setStatus("success");
        timeline.push("resolve", "Lab2 (legacy): request resolved", { requestId });
      })
      .catch((err: unknown) => {
        if (!active) return;
        setStatus("error");
        setError(err instanceof Error ? err.message : String(err));
        timeline.push("reject", "Lab2 (legacy): request rejected", { requestId });
      });

    return () => {
      active = false;
      timeline.push("note", "Lab2 (legacy): cleanup (stale response guarded)", { requestId });
    };
  }, [requestId, shouldFail]);

  return (
    <PaneShell
      title="Legacy: useEffect + local loading/error state"
      subtitle="Explicit orchestration (loading flags, cleanup, state transitions)"
    >
      {status === "loading" ? <LoadingBlock label="Loading (legacy)..." /> : null}
      {status === "error" ? <ErrorBlock msg={error ?? "Unknown error"} /> : null}
      {status === "success" && data ? <UserBlock data={data} /> : null}
      {status === "idle" ? <div style={{ opacity: 0.75 }}>Idle</div> : null}
    </PaneShell>
  );
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

function LoadingBlock({ label }: { label: string }) {
  return (
    <div>
      <strong>{label}</strong>
      <div style={{ fontSize: 12, opacity: 0.75 }}>Local loading state drives this UI.</div>
    </div>
  );
}

function ErrorBlock({ msg }: { msg: string }) {
  return (
    <div>
      <strong>Failed</strong>
      <div style={{ fontSize: 12, opacity: 0.75 }}>{msg}</div>
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
