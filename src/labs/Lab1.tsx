import { AuthProvider, TenantOverrideProvider } from "./lab1/authContext";
import { ReadWithUse } from "./lab1/ReadWithUse";
import { ReadWithUseContext } from "./lab1/ReadWithUseContext";
import { LabShell } from "./LabShell";
import { Controls } from "./lab1/Controls";

export function Lab1() {
  return (
    <LabShell
      title="Lab 1 — Context read patterns"
      description="Same state, two consumption styles: useContext(AuthContext) vs use(AuthContext). Includes a nested provider override to demonstrate composition."
    >
      <AuthProvider>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Controls />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Card title="Baseline provider">
              <ReadWithUseContext />
            </Card>

            <Card title="Baseline provider">
              <ReadWithUse />
            </Card>
          </div>

          <div style={{ marginTop: 8, opacity: 0.9, fontSize: 13 }}>
            Nested provider override example:
          </div>

          <TenantOverrideProvider tenantId="t_override_demo">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <Card title="Nested override">
                <ReadWithUseContext />
              </Card>

              <Card title="Nested override">
                <ReadWithUse />
              </Card>
            </div>
          </TenantOverrideProvider>
        </div>
      </AuthProvider>
    </LabShell>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        border: "1px solid rgba(0,0,0,0.10)",
        borderRadius: 14,
        padding: 14,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div style={{ fontSize: 12, opacity: 0.7 }}>{title}</div>
      {children}
    </div>
  );
}
