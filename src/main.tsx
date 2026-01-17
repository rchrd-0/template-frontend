import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { AuthProvider } from "@/contexts/AuthProvider.tsx";
import { TanstackQueryProvider } from "@/integrations/tanstack-query/root-provider.tsx";
import { TanstackRouterProvider } from "@/integrations/tanstack-router/root-provider.tsx";

// biome-ignore lint/style/noNonNullAssertion: entry point
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TanstackQueryProvider>
      <AuthProvider>
        <TanstackRouterProvider />
      </AuthProvider>
    </TanstackQueryProvider>
  </StrictMode>,
);
