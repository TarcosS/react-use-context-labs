# Rejections + ErrorBoundary — Failure as a Contract

> **What you'll learn**
> - How rejected promises surface as thrown errors during render
> - How to use ErrorBoundary to own failure UI (instead of component-level error state)

---

## Core idea
With `use(promise)`, a rejected promise is surfaced by throwing during render.
That is not a “random crash”; it’s a predictable signal that should be routed into an ErrorBoundary.

## Contracts
- Suspense owns **loading UI**
- ErrorBoundary owns **failure UI**
- Components focus on rendering from values

## Lab mapping
- Lab 4 shows rejected promises being handled by an ErrorBoundary, with an explicit “retry” path.

## Practical guidance
- Keep boundaries close to the UX that needs them.
- Ensure retry actually creates a new resource (new request key / new promise).
