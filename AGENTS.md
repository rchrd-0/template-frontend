# Agent Instructions

## Purpose

This repository is a reusable frontend starter for building React applications quickly while
retaining clear conventions, type safety, and a predictable project structure.

Build the smallest coherent product that satisfies the current requirements. Prefer small,
working vertical slices over speculative abstractions, placeholder infrastructure, or broad
rewrites. Preserve the existing architecture unless the task explicitly requires changing it.

## Branch Variants

This template has two supported branches. Inspect the current branch and repository before making
assumptions about routing:

- `main` is the routing-agnostic starter and does not include an application router.
- `tanstack-router` adds TanStack Router with file-based routing.

Do not introduce a router on `main` unless the task requires one. Do not remove or replace TanStack
Router on `tanstack-router` without a clear requirement. Guidance in the Routing section applies
only when the current branch contains TanStack Router.

## Stack

The shared stack is:

- React 19
- TypeScript
- Vite
- Bun
- TanStack Query for asynchronous server state
- Ky for ordinary HTTP requests
- Tailwind CSS 4
- Existing components under `src/components/ui`, generated or adapted from shadcn/ui
- Sonner for notifications
- Biome for formatting and linting

The `tanstack-router` branch additionally uses TanStack Router with file-based routing.

Use the libraries already present in the current branch. Do not introduce competing alternatives
without a clear requirement. In particular:

- Do not add React Router alongside TanStack Router.
- Do not add Axios when Ky covers the use case.
- Do not add another server-state library alongside TanStack Query.
- Do not add another component system when existing UI primitives or a focused local component are
  sufficient.
- Do not add ESLint or Prettier alongside Biome.
- Do not add a global-state library for state that can remain local, navigable, or server-owned.

## Before Editing

Before substantial implementation:

1. Inspect `git status`, the current branch, and the relevant repository files.
2. Read `.plans/project.md` when it exists, followed by only the `.docs/` and `.plans/` files
   relevant to the task.
3. If `DESIGN.md` exists, follow it as the source of truth for the product's design language.
4. Identify the requested outcome, acceptance criteria, and smallest demoable vertical slice.
5. Note assumptions, risks, or unclear requirements.
6. For work that changes architecture, spans several files, introduces a feature, or carries
   migration risk, propose a short plan and confirm it before implementation.

For small, local, clearly scoped changes, proceed directly after inspection.

Implement in short, inspectable loops: make one coherent change, verify it, fix concrete issues,
and then continue. Prefer demonstrable progress over incomplete architectural groundwork.

## Version Control and Existing Work

- Do not stage, commit, merge, create or switch branches, rebase, force-push, or modify
  `.gitignore` without explicit permission.
- Preserve existing user changes. Do not discard, overwrite, or reformat unrelated work.
- Keep changes scoped to the requested task and report unrelated problems instead of fixing them
  automatically.
- Never claim to have run a command or check that was not run.

## Commands

Use Bun unless the task explicitly requires another package manager.

```bash
bun install
bun dev
bun check
bun check:fix
bun format
bun build
bun preview
```

Run `bun check:fix` only when automatic fixes are appropriate, then inspect its diff. Do not use a
broad formatter or fixer to rewrite unrelated files.

For changes to application source, build configuration, or dependencies, run before completion:

```bash
bun check
bun build
```

For documentation-only changes, these commands are optional unless the documentation changes
executable examples or configuration.

If a check fails, report the command and relevant error. Determine whether the failure was
introduced by the current change; do not hide failures or expand scope to repair unrelated baseline
issues without permission.

No automated test suite is currently configured. Do not claim tests were run. When a change has
meaningful behavioural risk, discuss whether adding focused tests is warranted rather than adding a
test framework automatically.

## Project Structure

Follow the structure present on the current branch. On `tanstack-router`, the main source layout is:

```text
src/
├── api/            # Shared API client, response types, and endpoint definitions
├── components/     # Reusable application, layout, and UI components
├── contexts/       # React contexts for application-wide concerns
├── integrations/   # TanStack Router and Query setup
├── lib/            # Browser-side services and shared application helpers
├── routes/         # TanStack Router file-based routes
├── utils/          # Small focused utilities, such as class-name composition
├── main.tsx        # Application entry point
├── routeTree.gen.ts
└── index.css
```

Place code according to responsibility and follow the nearest existing precedent. Do not create
broad catch-all folders such as `helpers`, `common`, or `misc`. Use the configured `@/` alias for
imports from `src` where it improves clarity.

Do not manually edit generated files such as `src/routeTree.gen.ts`. Let TanStack Router tooling
regenerate the route tree and review the generated diff when routes change.

## Routing

On the `tanstack-router` branch, routes live under `src/routes` and follow TanStack Router's
file-routing conventions.

- Use route files for page composition and route-specific concerns.
- Move substantial UI sections into focused components rather than putting an entire feature in a
  route file.
- Use loaders, validated search parameters, and route context only when they materially improve the
  feature.
- Preserve the root layout and router integration unless the task requires changing them.
- When adding or changing a route, verify in-app navigation, direct navigation, and refresh
  behaviour.

On `main`, do not create a routing abstraction for a one-screen interaction or hypothetical future
pages.

## Components and Styling

- Prefer small components with clear responsibilities.
- Reuse existing primitives under `src/components/ui` before creating replacements.
- Keep one-off components close to the feature; promote them to shared locations only after genuine
  reuse appears.
- Avoid premature generic APIs, deeply nested prop chains, and global state used only by one route
  or component.
- Use semantic HTML and preserve keyboard usability.
- Use Tailwind CSS and existing tokens and component conventions.
- Prefer responsive, mobile-first layouts with accessible contrast, visible focus states, readable
  type, and usable touch targets.
- Do not add another styling system or perform an unrelated visual redesign.

shadcn components are source code owned by this repository, not opaque dependencies. Inspect and
adapt generated components to match existing conventions. Before running the shadcn CLI, inspect
`components.json` and verify that its paths match the current branch.

## State Management

Use the narrowest appropriate mechanism:

- Component state for local interaction state.
- URL or validated search parameters for shareable and navigable state when a router is present.
- TanStack Query for remote server state.
- Existing context only for truly application-wide concerns.

Do not duplicate server data into global client state without a concrete reason. Do not introduce
Redux, Zustand, Jotai, or another global-state library unless the requirements demonstrate a need.

## API and Data Fetching

Use the existing API layer for ordinary JSON requests.

- Keep the shared Ky client and shared response behaviour in `src/api`.
- Define endpoint functions in the established API module or a focused feature API module.
- Keep transport details out of presentation components.
- Use TanStack Query for fetching, caching, mutations, and remote request state.
- Use stable, descriptive query keys and update or invalidate relevant data after mutations.
- Represent loading, empty, success, and error states when they apply to the user flow.

Inspect the shared client before adding an endpoint; it assumes a JSON response envelope and may
include the optional authentication hooks described below. For streaming output, server-sent
events, files, or plain text, use a separate focused client or direct `fetch` rather than distorting
the standard abstraction.

Never expose private API keys or server-only secrets in browser code or `VITE_*` variables.

## Authentication

Authentication is an optional scaffold, not a required part of applications built from this
template. Decide from the product requirements whether authentication is in scope; do not keep or
extend it merely because starter files exist.

When the application does not require authentication, remove the scaffold completely rather than
leaving unused providers, token storage, request hooks, or route decisions in place:

- Delete `src/contexts/AuthProvider.tsx` and remove its import and wrapper from `src/main.tsx`.
- Delete `src/lib/auth.ts`; a public application does not need a JWT or other token in
  `localStorage`.
- Remove the auth import, bearer-token injection, and token-clearing/redirect behaviour from
  `src/api/client.ts`, while preserving its general response parsing and error handling.
- Remove any auth-specific router context and types, protected-route `beforeLoad` checks, login or
  logout routes, auth-only UI, hooks, query keys, and tests when they exist.
- Remove stale auth documentation and examples from `README.md`, plus any auth-specific environment
  variables, so the resulting project does not imply that authentication is configured.
- Do not replace removed auth code with empty providers, placeholder contexts, mocked sessions, or
  speculative abstractions.

When authentication is required, confirm the server contract and intended session mechanism before
implementation. The included JWT-in-`localStorage` approach is only a replaceable starting point,
not a project convention that must be preserved. Build login, registration, route protection,
token refresh, and logout behaviour only when the requirements call for them. Treat browser-stored
tokens and authenticated requests as security-sensitive, and never log tokens or secrets.

## AI Features

For AI-enabled features, define the bounded user-visible outcome before choosing infrastructure.
Keep model calls and secrets behind a server-side boundary, prefer structured inputs and outputs,
validate model output before rendering, and handle loading, timeout, failure, and retry states.

For prototypes, establish the complete interaction with mock or deterministic data before adding a
real model call when practical. Do not introduce RAG, autonomous agents, persistence,
authentication, or observability unless the requested workflow benefits from them.

## Error Handling and UX

- Handle errors where users or callers can act on them.
- Preserve the original cause and enough context for debugging without exposing secrets or internal
  stack traces.
- Use notifications for transient outcomes and inline errors for forms or workflow failures.
- Use labels for form controls, buttons for actions, and links for navigation.
- Guard duplicate submissions and provide useful loading feedback.
- Do not rely on colour alone to communicate state.
- Avoid unnecessary layout shifts.

For user-facing changes, verify the affected flow in a browser when the environment permits. Check
relevant desktop and mobile sizes, keyboard interaction, and the important states of the changed
flow. If browser verification was not possible, state that clearly in the final response.

## Dependencies and Environment

Before adding a dependency, check whether the existing stack or a small local implementation
already solves the problem. Explain why a new package is needed and confirm that it is maintained
and appropriate for the browser runtime.

Use `bun add` and `bun remove` for dependency changes. Do not manually edit dependency versions,
run `bun install`, or update `bun.lock` unless the task requires a dependency change or installation.
Do not update unrelated packages.

Do not modify `.env` files without permission. When adding a public environment variable, update
`.env.example` with a safe placeholder and never include a real credential. Keep environment-
specific URLs in environment variables and do not hard-code local backend addresses into production
application code.

## Scope and Architecture Guardrails

Do not introduce a backend, database, authentication flow, monorepo, SSR, Server Components,
WebSockets, queues, complex caching, a new design system, broad state management, or a generic
future-facing abstraction unless the current requirements need it.

Do not rewrite working code without a task-related reason, invent requirements, leave large
commented-out implementations, or optimize secondary details while the core flow is incomplete.
When requirements are ambiguous, choose the clearest working vertical slice with the least
irreversible complexity, unless the choice would materially change product behaviour—in that case,
ask for direction.

## Deployment

Keep the application deployable as a standard Vite single-page application unless a task chooses a
different architecture. On branches with client-side routing, deployment configuration must provide
an SPA fallback. Do not add platform-specific configuration until a deployment target is selected.
Run a production build before deployment.

## Completion

A task is complete when:

- The requested outcome and applicable user flow work.
- Relevant loading, empty, success, and failure states are handled.
- The implementation follows the current branch's conventions.
- No secrets, unrelated changes, unnecessary dependencies, or speculative architecture were added.
- Required checks pass, or any failures and their likely ownership are reported honestly.
- User-facing behaviour was manually verified when practical, with any verification gap disclosed.

The final response should state what changed, how it was verified, and any assumptions or known
limitations. Include next steps only when they are relevant.
