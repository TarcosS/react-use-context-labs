export type TimelineEventType =
  | "render"
  | "suspend"
  | "resolve"
  | "reject"
  | "transition"
  | "note";

export type TimelineEvent = {
  id: string;
  ts: number; // performance.now() timestamp
  type: TimelineEventType;
  label: string;
  meta?: Record<string, unknown>;
};

function createId() {
  // Good enough for local observability
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

type Subscriber = (events: TimelineEvent[]) => void;

class TimelineStore {
  private events: TimelineEvent[] = [];
  private subscribers = new Set<Subscriber>();

  getSnapshot = () => this.events;

  subscribe = (fn: Subscriber) => {
    this.subscribers.add(fn);
    return () => this.subscribers.delete(fn);
  };

  push = (type: TimelineEventType, label: string, meta?: Record<string, unknown>) => {
    const evt: TimelineEvent = { id: createId(), ts: performance.now(), type, label, meta } as TimelineEvent;
    this.events = [evt, ...this.events].slice(0, 200); // cap to avoid infinite growth
    this.subscribers.forEach((s) => s(this.events));
  };

  clear = () => {
    this.events = [];
    this.subscribers.forEach((s) => s(this.events));
  };
}

export const timeline = new TimelineStore();
