import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider, AuthProviderProps } from "react-oidc-context";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Error } from "./Components/Error.tsx"

const oidcConfig: AuthProviderProps = {
  authority: "https://auth.snowse.duckdns.org/realms/advanced-frontend/",
  client_id: "bryce-oAuth2",
  redirect_uri:
    "https://moviesearch.duckdns.org/",
    // "http://localhost:5173/",
  onSigninCallback: () => {
    const url =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.replaceState({ path: url }, "", url);
  },
  automaticSilentRenew: true,
};
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <AuthProvider {...oidcConfig}>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary fallback={<Error/>}>
            <App />
          </ErrorBoundary>
        </QueryClientProvider>
      </AuthProvider>
    </StrictMode>
  </BrowserRouter>
);
