import { LabShell } from "./LabShell";
import { AppConfigProvider } from "./lab3/appConfigContext";
import { Controls } from "./lab3/Controls";
import { PricingPane } from "./lab3/PricingPane";

export function Lab3() {
  return (
    <LabShell
      title="Lab 3 — Composition"
      description="Context drives resource parameters. A resource factory applies safe caching. UI reads with use(resource) under Suspense."
    >
      <AppConfigProvider>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Controls />
          <PricingPane />
        </div>
      </AppConfigProvider>
    </LabShell>
  );
}
