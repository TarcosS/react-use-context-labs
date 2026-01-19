import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <h1 style={{ margin: 0 }}>404</h1>
      <p style={{ margin: 0, opacity: 0.85 }}>Page not found.</p>
      <div>
        <Link to="/">Go home</Link>
      </div>
    </div>
  );
}
