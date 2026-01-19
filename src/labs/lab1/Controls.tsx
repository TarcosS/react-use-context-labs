import { useContext } from "react";
import { AuthContext } from "./authContext";
import { timeline } from "../../observability/timeline";

export function Controls() {
  const ctx = useContext(AuthContext);
  if (!ctx) return null;

  const { auth, setRole, rotateUser } = ctx;

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
      <strong style={{ marginRight: 8 }}>Controls</strong>

      <button
        type="button"
        onClick={() => {
          rotateUser();
          timeline.push("transition", "Lab1: rotateUser()");
        }}
        style={btn}
      >
        Rotate user
      </button>

      <select
        value={auth.role}
        onChange={(e) => {
          const role = e.target.value as "guest" | "member" | "admin";
          setRole(role);
          timeline.push("transition", "Lab1: setRole()", { role });
        }}
        style={{ padding: "8px 10px", borderRadius: 10 }}
      >
        <option value="guest">guest</option>
        <option value="member">member</option>
        <option value="admin">admin</option>
      </select>

      <span style={{ fontSize: 12, opacity: 0.75 }}>
        Changes should reflect identically in both readers.
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
