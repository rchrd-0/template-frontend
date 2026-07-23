# Frontend template without routing

The `no-router` branch is a reusable React and Vite starter for applications that do not need an application router. Use the default `main` branch when you want TanStack Router with file-based routing.

## Stack

- React 19 and TypeScript
- Vite with Bun for package management and scripts
- TanStack Query, including its development tools
- Tailwind CSS 4 through the Vite plugin
- shadcn 4 components built on Base UI primitives
- Phosphor icons
- Ky for JSON API requests
- Sonner for notifications
- Biome for formatting and linting

## Included conventions

- `src/App.tsx` is the application root without a routing abstraction
- Shared UI source lives in `src/components/ui`
- `src/index.css` is the Tailwind and application stylesheet entry point
- `components.json` uses the `base-lyra` style and Phosphor icon library
- The development server proxies `/api` to `http://localhost:3001`
- Authentication scaffolding is optional and can be removed when the product does not need it

## Create a project

Clone the routerless branch and initialize a new repository:

```bash
git clone -b no-router git@github.com:rchrd-0/template-frontend.git my-app
cd my-app
rm -rf .git
git init
bun install
bun dev
```

For file-based routing, clone the default `main` branch instead:

```bash
git clone git@github.com:rchrd-0/template-frontend.git my-app
```

## Configure the API

Local requests to `/api` use the Vite proxy. To target another API, copy the environment example and set the public base URL:

```bash
cp .env.example .env
```

```dotenv
VITE_API_BASE_URL=https://api.example.com
```

Do not put private keys or server-only secrets in `VITE_*` variables.

## Commands

| Command | Purpose |
| --- | --- |
| `bun install` | Install dependencies |
| `bun dev` | Start the development server |
| `bun check` | Run Biome checks and TypeScript type checking |
| `bun check:fix` | Apply safe Biome fixes, then type-check |
| `bun format` | Format source files with Biome |
| `bun run build` | Type-check and create a production build |
| `bun preview` | Preview the production build |

## Build the application root

Compose the application in `src/App.tsx`. Keep one-screen interactions local instead of adding a routing abstraction for hypothetical pages.

If the product later needs navigable pages, consider starting from `main` rather than recreating its TanStack Router integration.

## Fetch API data

Define endpoint functions in `src/api/routes.ts`, then consume them through TanStack Query. The shared Ky client unwraps the repository's JSON response envelope and converts failed responses into `ApiError` instances.

```tsx
const healthQuery = useQuery({
  queryKey: ["health"],
  queryFn: api.checkHealth,
});
```

Inspect `src/api/client.ts` before adding endpoints with streaming, file, plain-text, or nonstandard responses.

## Choose whether to keep authentication

The repository includes an optional `AuthProvider`, local token helper, and Ky authentication hooks. Keep and adapt them only when the product requires authentication.

For a public application, remove:

- `src/contexts/AuthProvider.tsx`
- `src/lib/auth.ts`
- The `AuthProvider` wrapper in `src/main.tsx`
- Bearer-token injection and token-clearing behavior in `src/api/client.ts`
- Any login, logout, or auth-context code added later

Do not assume that a new application needs a JSON Web Token (JWT) in `localStorage`. Choose the session mechanism from the server contract when authentication is required.

## Add UI components

The shadcn configuration targets Base UI, Phosphor icons, Tailwind CSS 4, and `src/index.css`. Inspect `components.json` before running the command:

```bash
bunx --bun shadcn@latest add button input form
```

Generated components become repository-owned source under `src/components/ui`. Adapt them to the application instead of treating them as opaque package code.

## Source structure

```text
src/
├── api/          # Ky client, response types, and endpoints
├── components/   # Layout and UI components
├── contexts/     # Optional application-wide contexts
├── integrations/ # TanStack Query setup
├── lib/          # Browser services and shared helpers
├── utils/        # Focused utilities
├── App.tsx       # Application root
├── index.css     # Tailwind and application styles
└── main.tsx      # Application entry point
```

See `AGENTS.md` for implementation conventions, scope guardrails, and completion checks.
