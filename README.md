# react-use-context-labs

React 19.2 `use` API labs: Context & Promise patterns with Suspense, comparisons, and tests.

## What this repo is
A focused set of small “labs” to demonstrate how `use(resource)` can read:
- **Context values** (`use(MyContext)`)
- **Promise values** (`use(promise)`), with **Suspense** boundaries

Reference: React `use` API docs. :contentReference[oaicite:2]{index=2}

## Labs (WIP)
- Lab 1 — Context read patterns (useContext vs use(Context))
- Lab 2 — Promise consumption + Suspense vs legacy effects
- Lab 3 — Context-driven resources + safe caching
- Lab 4 — Rejections + ErrorBoundary

## Scripts
```bash
pnpm dev
pnpm build
pnpm preview
