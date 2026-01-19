# react-use-context-labs

React 19.2 `use` API labs: Context & Promise patterns with Suspense, comparisons, and tests.

## What this repo is
A focused set of small “labs” to demonstrate how `use(resource)` can read:
- **Context values** (`use(MyContext)`)
- **Promise values** (`use(promise)`), with **Suspense** boundaries

Reference: React `use` API docs. :contentReference[oaicite:2]{index=2}

## Version note
This project targets React 19.2.x and focuses on the `use` API (render-time resource reading).
If you run a different React version, behavior and examples may not match 1:1.

## Docs
- docs/01-why-use.md — narrative and mental model
- docs/02-context-with-use.md — Context consumption patterns
- docs/03-error-and-rejection.md — Error boundaries and failure contracts
- docs/04-performance-notes.md — what to measure (and what not to claim)

## Labs
- Lab 1 — Context read patterns (useContext vs use(Context))
- Lab 2 — Promise + Suspense vs legacy effects.\
Observe: legacy updates after state orchestration; use(promise) updates as soon as the value becomes available (under Suspense).
- Lab 3 — Context-driven resources + safe caching
- Lab 4 — Rejections + ErrorBoundary (failure as a contract)

## Non-goals
- Not a full data fetching framework
- Not a “state management library comparison”
- Not a claim that `use()` is always faster

## Scripts
```bash
pnpm dev
pnpm build
pnpm preview
