import type { ReactNode } from "react";

type Props = {
  title: string;
  description: string;
  children?: ReactNode;
};

export function LabShell({ title, description, children }: Props) {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <header style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <h2 style={{ margin: 0 }}>{title}</h2>
        <p style={{ margin: 0, opacity: 0.85, lineHeight: 1.6 }}>{description}</p>
      </header>

      <div
        style={{
          border: "1px solid rgba(0,0,0,0.12)",
          borderRadius: 14,
          padding: 16,
        }}
      >
        {children}
      </div>
    </section>
  );
}
