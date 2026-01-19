# Context + `use`

## Two ways to read Context
- `useContext(MyContext)` (classic)
- `use(MyContext)` (render-time read)

## What changes with `use(MyContext)`?
- It’s a **render-time read**, aligned with other `use(resource)` reads.
- It can simplify composition in patterns where “resource reading” is uniform.

## What does NOT change?
- Context still flows via Providers.
- Re-render behavior still depends on Provider value identity.

## Lab mapping
- Lab 1 shows both side-by-side with the same UI, and a nested provider override to demonstrate composition.

## Trade-offs
- Prefer whichever is clearer for your team’s mental model.
- Don’t chase novelty; aim for consistency and readability.
