# react-use-context-labs

> **TL;DR**  
> React 19's `use()` API lets you read **Context** and **Promise** values at render time.  
> Suspense owns loading UI. ErrorBoundary owns failure UI.  
> Components just render values — no more `loading`/`error` state machines.  
> This repo has 4 labs to compare the old vs new patterns side-by-side.

---

## What this demonstrates

| Concept | Pattern |
|---------|---------|
| **Context** | `use(Context)` vs `useContext(Context)` |
| **Promise** | `use(promise)` + Suspense vs `useEffect` + loading state |
| **Composition** | Context → resource factory → cached promise → UI |
| **Failure** | Rejected promise → ErrorBoundary (failure as a contract) |

---

## Labs

| Lab | Focus | Key takeaway |
|-----|-------|--------------|
| **Lab 1** | Context reads | `use(Context)` works inside conditionals; `useContext` doesn't |
| **Lab 2** | Promise + Suspense | No `loading` flag — Suspense boundary owns the fallback |
| **Lab 3** | Composition | Context drives params → resource cache → `use(resource)` |
| **Lab 4** | Rejection handling | ErrorBoundary catches rejected promises, provides retry |

---

## How to run

```bash
pnpm install
pnpm dev          # http://localhost:5173
```

```bash
pnpm test         # run tests
pnpm build        # production build
```

---

## Non-goals & trade-offs

| ❌ Not a goal | Why |
|--------------|-----|
| "use() is always faster" | Network latency dominates; focus on complexity, not ms |
| Full data-fetching framework | This is a learning repo, not a library |
| State management comparison | Only comparing `use()` patterns |

| ⚠️ Trade-off | Note |
|-------------|------|
| Suspense requires boundaries | You need `<Suspense>` wrappers; can feel verbose |
| ErrorBoundary is class-based | No hook equivalent yet; adds boilerplate |
| Promise identity matters | New promise = new fetch; cache/memoize carefully |
| Not for all async | Side-effects (POST, analytics) still need `useEffect` |

---

## Docs

- [docs/01-why-use.md](docs/01-why-use.md) — mental model
- [docs/02-context-with-use.md](docs/02-context-with-use.md) — Context patterns
- [docs/03-error-and-rejection.md](docs/03-error-and-rejection.md) — failure contracts
- [docs/04-performance-notes.md](docs/04-performance-notes.md) — what to measure

---

**React 19.2.x** · MIT License
