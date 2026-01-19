import { useSyncExternalStore } from "react";
import { timeline } from "./timeline";

export function useTimeline() {
  const events = useSyncExternalStore(timeline.subscribe, timeline.getSnapshot, timeline.getSnapshot);
  return {
    events,
    push: timeline.push,
    clear: timeline.clear,
  };
}
