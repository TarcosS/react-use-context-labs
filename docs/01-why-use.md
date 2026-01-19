# Why `use`?

This repo is intentionally narrow: it focuses on the React `use` API as a **render-time resource reader**.

> Key mental model: `use(resource)` lets a component **read a resource during render**.
> That resource can be a **Promise** (data) or a **Context** (dependency/config).

## What problem does `use` address?

In many UIs, data access ends up producing a repeated pattern:

- local `loading` state
- local `error` state
- an effect to start async work
- careful “stale response” and “cleanup” handling
- duplicated transitions across multiple components

This is not “wrong”, but it often creates **extra states** and **extra wiring** that are not the business problem.

`use` shifts the model:

- “start work in an effect, then set state”
- to
- “read a resource; if it’s not ready yet, the render suspends (Suspense boundary owns the fallback)”

That promotes **composition**:
- Suspense boundaries become the “loading UI contract”
- Error boundaries become the “failure UI contract”
- Components focus on rendering from values, not orchestrating state machines

## What this repo demonstrates

### 1) Context reads
Two ways to consume context:

- `useContext(MyContext)` (classic)
- `use(MyContext)` (render-time read)

Lab 1 compares them with the same UI so the difference stays conceptual, not cosmetic.

### 2) Promise reads + Suspense
Two ways to load data:

- legacy: `useEffect` + `useState` + `loading` flags
- `use(promise)` + `<Suspense fallback=...>`

Lab 2 makes this side-
