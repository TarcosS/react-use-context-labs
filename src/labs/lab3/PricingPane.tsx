import { Suspense, use, useContext, useEffect, useMemo } from "react";
import { AppConfigContext } from "./appConfigContext";
import { getPricingResource } from "./resources";
import type { PricingDTO } from "./resources";
import { SuspendFallback } from "../lab2/SuspendFallback";
import { timeline } from "../../observability/timeline";

export function PricingPane() {
  const ctx = useContext(AppConfigContext);

  const config = ctx?.config;

  const resource = useMemo(() => {
    if (!config) return null;
    // resource creation is deterministic & cached by key inside getPricingResource
    return getPricingResource(config);
  }, [config]);

  if (!config) {
    return <div style={{ opacity: 0.75 }}>Missing AppConfigProvider</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ fontSize: 12, opacity: 0.75 }}>
        Resource key: <code>{`${config.tenantId}|${config.locale}|${config.pricingTier}`}</code>
      </div>

      <Suspense fallback={<SuspendFallback label="Lab3: pricing resource" />}>
        <Inner promise={resource!} />
      </Suspense>

      <div style={{ fontSize: 12, opacity: 0.75 }}>
        Pattern: Context drives params → resource factory uses a cache → UI reads via <code>use</code>.
      </div>
    </div>
  );
}

function Inner({ promise }: { promise: Promise<PricingDTO> }) {
  useEffect(() => {
    timeline.push("transition", "Lab3 (use): reading pricing resource");
  }, []);

  const data = use(promise);

  useEffect(() => {
    timeline.push("resolve", "Lab3 (use): pricing resource resolved", { requestKey: data.requestKey });
  }, [data.requestKey]);

  return (
    <div
      style={{
        border: "1px solid rgba(0,0,0,0.10)",
        borderRadius: 14,
        padding: 14,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <Row k="tenantId" v={data.tenantId} />
      <Row k="locale" v={data.locale} />
      <Row k="pricingTier" v={data.pricingTier} />
      <Row k="currency" v={data.currency} />
      <Row k="label" v={data.menuPriceLabel} />
      <Row k="requestKey" v={data.requestKey} />
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
