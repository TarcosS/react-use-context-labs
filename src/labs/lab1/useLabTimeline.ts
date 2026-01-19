import { useEffect } from "react";
import { timeline } from "../../observability/timeline";

export function useLabTimeline(lab: string, label: string, meta?: Record<string, unknown>) {
  useEffect(() => {
    timeline.push("note", `${lab}: ${label}`, meta);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
