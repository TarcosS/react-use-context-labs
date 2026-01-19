import { useContext } from "react";
import { AppConfigContext } from "./appConfigContext";
import { clearPricingCache } from "./resources";
import { timeline } from "../../observability/timeline";

export function Controls() {
  const ctx = useContext(AppConfigContext);
  if (!ctx) return null;

  const { config, setTenantId, toggleLocale, toggleTier } = ctx;

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
      <strong style={{ marginRight: 8 }}>Config</strong>

      <label style={lbl}>
        Tenant:
        <select
          value={config.tenantId}
          onChange={(e) => {
            setTenantId(e.target.value);
            timeline.push("transition", "Lab3: setTenantId()", { tenantId: e.target.value });
          }}
          style={sel}
        >
          <option value="t_pamelo">t_pamelo</option>
          <option value="t_demo_us">t_demo_us</option>
        </select>
      </label>

      <button
        type="button"
        onClick={() => {
          toggleLocale();
          timeline.push("transition", "Lab3: toggleLocale()");
        }}
        style={btn}
      >
        Toggle locale (current: {config.locale})
      </button>

      <button
        type="button"
        onClick={() => {
          toggleTier();
          timeline.push("transition", "Lab3: toggleTier()");
        }}
        style={btn}
      >
        Toggle tier (current: {config.pricingTier})
      </button>

      <button type="button" onClick={clearPricingCache} style={btn}>
        Clear cache
      </button>

      <span style={{ fontSize: 12, opacity: 0.75 }}>
        Changes update the resource key; cache hit/miss is visible in Timeline.
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

const lbl: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  fontSize: 13,
};

const sel: React.CSSProperties = {
  padding: "8px 10px",
  borderRadius: 10,
};
