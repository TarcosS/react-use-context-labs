import type { ReactNode } from "react";
import React, { createContext, useMemo, useState } from "react";

export type AppConfig = {
  tenantId: string;
  locale: "en" | "tr";
  pricingTier: "standard" | "pro";
};

type AppConfigContextValue = {
  config: AppConfig;
  setTenantId: (tenantId: string) => void;
  toggleLocale: () => void;
  toggleTier: () => void;
};

const defaultConfig: AppConfig = {
  tenantId: "t_pamelo",
  locale: "en",
  pricingTier: "standard",
};

export const AppConfigContext = createContext<AppConfigContextValue | null>(null);

export function AppConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<AppConfig>(defaultConfig);

  const value = useMemo<AppConfigContextValue>(() => {
    return {
      config,
      setTenantId: (tenantId) => setConfig((p) => ({ ...p, tenantId })),
      toggleLocale: () =>
        setConfig((p) => ({ ...p, locale: p.locale === "en" ? "tr" : "en" })),
      toggleTier: () =>
        setConfig((p) => ({ ...p, pricingTier: p.pricingTier === "standard" ? "pro" : "standard" })),
    };
  }, [config]);

  return <AppConfigContext.Provider value={value}>{children}</AppConfigContext.Provider>;
}
