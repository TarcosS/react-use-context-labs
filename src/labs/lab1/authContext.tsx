import type { ReactNode } from "react";
import React, { createContext, useMemo, useState } from "react";

export type AuthState = {
  userId: string;
  role: "guest" | "member" | "admin";
  tenantId: string;
};

type AuthContextValue = {
  auth: AuthState;
  setRole: (role: AuthState["role"]) => void;
  rotateUser: () => void;
};

const defaultState: AuthState = {
  userId: "u_1001",
  role: "member",
  tenantId: "t_pamelo",
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(defaultState);

  const value = useMemo<AuthContextValue>(() => {
    return {
      auth,
      setRole: (role) => setAuth((prev) => ({ ...prev, role })),
      rotateUser: () =>
        setAuth((prev) => ({
          ...prev,
          userId: prev.userId === "u_1001" ? "u_2048" : "u_1001",
        })),
    };
  }, [auth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function TenantOverrideProvider({
  tenantId,
  children,
}: {
  tenantId: string;
  children: ReactNode;
}) {
  return (
    <AuthContext.Consumer>
      {(ctx) => {
        if (!ctx) return children;
        const next = { ...ctx, auth: { ...ctx.auth, tenantId } };
        return <AuthContext.Provider value={next}>{children}</AuthContext.Provider>;
      }}
    </AuthContext.Consumer>
  );
}
