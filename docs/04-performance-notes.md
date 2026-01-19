# Performance notes (what to measure)

This repo does not claim “use() is always faster”.
The goal is to make **responsibility boundaries** measurable.

## What the timeline shows
- Δprev: time between adjacent events
- Δstart: time since the beginning of a sequence

This helps you see:
- orchestration overhead (legacy pattern)
- boundary-driven transitions (Suspense / ErrorBoundary)

## Suggested measurements
- Compare “promise resolved” -> “UI updated”
- Count how many transitions are owned by components (legacy) vs boundaries (use + Suspense)

## Avoid incorrect conclusions
- Network latency dominates most real systems.
- Focus on *complexity cost* (states, flags, cleanup) more than micro-optimizing milliseconds.
