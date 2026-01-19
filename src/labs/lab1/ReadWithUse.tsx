import { use } from "react";
import { AuthContext } from "./authContext";
import { useLabTimeline } from "./useLabTimeline";

export function ReadWithUse() {
  useLabTimeline("Lab1", "ReadWithUse mounted");

  const ctx = use(AuthContext);
  if (!ctx) {
    return <div style={{ opacity: 0.75 }}>AuthContext missing (provider not mounted)</div>;
  }

  const { auth } = ctx;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <strong style={{ fontSize: 14 }}>Reader: use(AuthContext)</strong>
      <Row k="userId" v={auth.userId} />
      <Row k="role" v={auth.role} />
      <Row k="tenantId" v={auth.tenantId} />
      <small style={{ opacity: 0.75 }}>
        Render-time read via <code>use(Context)</code>.
      </small>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ display: "flex", gap: 10 }}>
      <span style={{ width: 80, opacity: 0.7 }}>{k}</span>
      <code>{v}</code>
    </div>
  );
}
