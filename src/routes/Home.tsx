import { Link } from "react-router-dom";

export function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <h1 style={{ margin: 0 }}>React 19.2 use API Labs</h1>
      <p style={{ margin: 0, opacity: 0.85, lineHeight: 1.6 }}>
        This repo demonstrates <code>use(resource)</code> with Context and Promises, plus Suspense and
        error boundaries—compared against legacy effect-based patterns.
      </p>

      <div style={{ marginTop: 10 }}>
        <Link to="/labs/lab-1">Start with Lab 1 →</Link>
      </div>
    </div>
  );
}
