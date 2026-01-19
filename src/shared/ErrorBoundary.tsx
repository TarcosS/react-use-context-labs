import React from "react";
import { timeline } from "../observability/timeline";

type Props = {
  label: string;
  fallback: (args: { error: Error; reset: () => void }) => React.ReactNode;
  children: React.ReactNode;
};

type State = { error: Error | null };

export class ErrorBoundary extends React.Component<Props, State> {
  override state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  override componentDidCatch(error: Error) {
    timeline.push("reject", `ErrorBoundary caught (${this.props.label})`, { message: error.message });
  }

  reset = () => {
    timeline.push("transition", `ErrorBoundary reset (${this.props.label})`);
    this.setState({ error: null });
  };

  override render() {
    if (this.state.error) {
      return this.props.fallback({ error: this.state.error, reset: this.reset });
    }
    return this.props.children;
  }
}
