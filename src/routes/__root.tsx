import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { PageLayout } from "@/components/layout/PageLayout";

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <PageLayout>
        <Outlet />
      </PageLayout>

      <TanStackRouterDevtools position="bottom-left" initialIsOpen={false} />
    </>
  );
}
