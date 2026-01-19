import { useContext } from "react";
import { AuthContext } from "./authContext";
import { useLabTimeline } from "./useLabTimeline";

export function ReadWithUseContext() {
  useLabTimeline("Lab1", "ReadWithUseContext mounted");

  const ctx = useContext(AuthContext);
  if (!ctx) {
    return <div style={{ opacity: 0.75 }}>AuthContext missing (provider not mounted)</div>;
  }

  const { auth } = ctx;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <strong style={{ fontSize: 14 }}>Reader: useContext(AuthContext)</strong>
      <Row k="userId" v={auth.userId} />
      <Row k="role" v={auth.role} />
      <Row k="tenantId" v={auth.tenantId} />
      <small style={{ opacity: 0.75 }}>
        Classic hook-based context consumption.
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
