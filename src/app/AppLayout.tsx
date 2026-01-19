import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { TimelinePanel } from "../observability/TimelinePanel";

type Props = { children: ReactNode };

const navItems = [
  { to: "/labs/lab-1", label: "Lab 1 — Context" },
  { to: "/labs/lab-2", label: "Lab 2 — Promise + Suspense" },
  { to: "/labs/lab-3", label: "Lab 3 — Composition" },
  { to: "/labs/lab-4", label: "Lab 4 — Rejection + Boundary" },
];

export function AppLayout({ children }: Props) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", minHeight: "100vh" }}>
      <aside
        style={{
          borderRight: "1px solid rgba(0,0,0,0.1)",
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <strong>react-use-context-labs</strong>
          <span style={{ fontSize: 12, opacity: 0.8 }}>
            React 19.2 <code>use</code> API labs
          </span>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              style={({ isActive }) => ({
                textDecoration: "none",
                padding: "10px 10px",
                borderRadius: 10,
                border: "1px solid rgba(0,0,0,0.08)",
                background: isActive ? "rgba(0,0,0,0.06)" : "transparent",
                color: "inherit",
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div style={{ marginTop: "auto", fontSize: 12, opacity: 0.7 }}>
          <div>
            Docs: <code>/docs</code>
          </div>
          <div>
            Labs: <code>/src/labs</code>
          </div>
        </div>
      </aside>

      <main style={{ padding: 24 }}>
        <div
          style={{
            display: "flex",
            gap: 18,
            alignItems: "start",
          }}
        >
          <div style={{ flex: 1 }}>{children}</div>
          <TimelinePanel />
        </div>
      </main>
    </div>
  );
}
