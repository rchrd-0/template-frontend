# RCHRD-0's Frontend Scaffold

My personal production-ready, DX-optimized frontend template.
Built for speed, type safety, and "batteries-included" features without the bloat.

## Tech Stack

- **Framework**: [React 19](https://react.dev) + [Vite](https://vitejs.dev)
- **Language**: TypeScript
- **Linting/Formatting**: [Biome](https://biomejs.dev)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **Components**: [shadcn/ui](https://ui.shadcn.com)
- **State/Async**: [TanStack Query v5](https://tanstack.com/query/latest)
- **API Client**: [Ky](https://github.com/sindresorhus/ky) (Fetch wrapper)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski)

## Key Features

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
   git clone git@github.com:rchrd-0/template-frontend.git my-app
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

## Architecture Guide

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
npx shadcn@latest add button input form
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
├── integrations/   # TanStack Query config
└── App.tsx         # Root component
```
