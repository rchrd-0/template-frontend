# RCHRD-0's Frontend Template (TanStack Router)

My personal production-ready, DX-optimized frontend template/starter kit.
Built for speed, type safety, and "batteries-included" features without the bloat.

**This branch (`tanstack-router`) uses TanStack Router for file-based routing.**

## Tech Stack

- **Framework**: [React 19](https://react.dev) + [Vite](https://vitejs.dev)
- **Language**: TypeScript
- **Routing**: [TanStack Router](https://tanstack.com/router/latest)
- **Linting/Formatting**: [Biome](https://biomejs.dev)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **Components**: [shadcn/ui](https://ui.shadcn.com)
- **State/Async**: [TanStack Query v5](https://tanstack.com/query/latest)
- **API Client**: [Ky](https://github.com/sindresorhus/ky) (Fetch wrapper)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski)

## Key Features

- **File-Based Routing**: Create files in `src/routes` and they automatically become routes.
- **Auth Ready**: Pre-built `AuthProvider` context and `useAuth` hook. Auto-injects JWT tokens into requests and handles 401 logouts automatically.
- **Robust API Layer**:
    - `src/api/client.ts`: Centralized client with error handling & type safety.
    - `src/api/routes.ts`: Define endpoints cleanly (async/await optional).
    - **Proxy Configured**: Dev server proxies `/api` -> `http://localhost:3001` (avoids CORS locally).
- **Layouts**: `PageLayout` component with built-in Toast notifications and max-width constraints.
- **UI Utils**: `<Spinner />`, `<Toaster />`, and `cn()` utility pre-configured.

## Getting Started

1. **Clone & Install**
   ```bash
   # Clone the specific branch
   git clone -b tanstack-router git@github.com:rchrd-0/template-frontend.git my-app
   cd my-app
   rm -rf .git
   git init
   bun install # or npm/pnpm/yarn
   ```

2. **Environment Setup**
   The app works out-of-the-box for local dev (proxies to `localhost:3001`).

   For production or custom backends:
   ```bash
   cp .env.example .env
   # Set VITE_API_BASE_URL=https://api.myapp.com
   ```

3. **Run Development Server**
   ```bash
   bun dev
   ```

## Commands

| Command | Description |
| :--- | :--- |
| `bun dev` | Start development server with HMR |
| `bun check` | Run Biome lint & TypeScript check |
| `bun format` | Format code with Biome |
| `bun build` | Build for production |
| `bun preview` | Preview production build locally |

## Architecture Guide

### Routing
This template uses **TanStack Router** with file-based routing.
- **New Page**: Create `src/routes/about.tsx` -> `/about`
- **Dynamic Route**: Create `src/routes/users/$userId.tsx` -> `/users/123`
- **Layouts**: Use `src/routes/__root.tsx` for the global layout.

```tsx
// src/routes/about.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return <div>Hello from About!</div>
}
```

### Advanced: Integrating Auth with Router
If you need to protect routes using `beforeLoad` and `redirect`, you can inject the Auth Context into the Router.

1. **Modify `src/integrations/tanstack-router/root-provider.tsx`**:
```tsx
import { useAuth } from "@/hooks/useAuth";

// ... inside the component ...
const auth = useAuth();
return <RouterProvider router={router} context={{ auth }} />;
```

2. **Protect a Route**:
```tsx
export const Route = createFileRoute('/dashboard')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/login' })
    }
  },
})
```

### API & Data Fetching
Define routes in `src/api/routes.ts`. Use standard `ky` syntax.
```ts
// src/api/routes.ts
export const api = {
  getUsers: () => apiClient.get("users").json<User[]>(),
  login: (creds) => apiClient.post("login", { json: creds }).json<AuthResponse>()
};
```

Consume in components with React Query:
```tsx
const { data: users } = useQuery({
  queryKey: ['users'],
  queryFn: api.getUsers
});
```

### Authentication
The `src/lib/auth.ts` helper manages tokens in `localStorage`.
```tsx
const { login, logout, isAuthenticated } = useAuth()
```

### Adding Components
This project is pre-configured for **shadcn/ui**.
```bash
bunx --bun shadcn@latest add button input form
```

## Project Structure

```
src/
├── api/            # API client and route definitions
├── components/
│   ├── layout/     # PageLayout, Wrapper
│   ├── ui/         # Shadcn components + Spinner/Sonner
├── contexts/       # AuthProvider
├── hooks/          # Custom hooks (useAuth)
├── lib/            # Utilities (auth storage, tailwind merge)
├── integrations/   # TanStack Query & Router config
├── routes/         # File-based routes (TanStack Router)
│   ├── __root.tsx  # Global layout
│   └── index.tsx   # Homepage
└── main.tsx        # Entry point
```
