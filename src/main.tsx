import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { TanstackQueryProvider } from "@/integrations/tanstack-query/root-provider.tsx";
import App from "./App.tsx";

// biome-ignore lint/style/noNonNullAssertion: entry point
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TanstackQueryProvider>
      <App />
    </TanstackQueryProvider>
  </StrictMode>,
);
