import { timeline } from "../../observability/timeline";
import type { AppConfig } from "./appConfigContext";

export type PricingDTO = {
  tenantId: string;
  locale: AppConfig["locale"];
  pricingTier: AppConfig["pricingTier"];
  currency: "CAD" | "USD";
  menuPriceLabel: string;
  requestKey: string;
};

type ResourceKey = string;

function makeKey(config: AppConfig): ResourceKey {
  return `${config.tenantId}|${config.locale}|${config.pricingTier}`;
}

const cache = new Map<ResourceKey, Promise<PricingDTO>>();

export function getPricingResource(config: AppConfig): Promise<PricingDTO> {
  const key = makeKey(config);

  const hit = cache.get(key);
  if (hit) {
    timeline.push("note", "Lab3: cache hit", { key });
    return hit;
  }

  timeline.push("transition", "Lab3: cache miss -> create resource", { key });

  const p = new Promise<PricingDTO>((resolve) => {
    window.setTimeout(() => {
      const currency = config.tenantId === "t_pamelo" ? "CAD" : "USD";
      const menuPriceLabel =
        config.locale === "tr"
          ? config.pricingTier === "pro"
            ? "Pro fiyatlandırma"
            : "Standart fiyatlandırma"
          : config.pricingTier === "pro"
            ? "Pro pricing"
            : "Standard pricing";

      resolve({
        tenantId: config.tenantId,
        locale: config.locale,
        pricingTier: config.pricingTier,
        currency,
        menuPriceLabel,
        requestKey: key,
      });
    }, 650);
  });

  cache.set(key, p);
  return p;
}

export function clearPricingCache() {
  cache.clear();
  timeline.push("note", "Lab3: cache cleared");
}
