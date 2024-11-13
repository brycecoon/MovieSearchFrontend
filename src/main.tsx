import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider, AuthProviderProps } from "react-oidc-context";
import { BrowserRouter } from "react-router-dom";

const oidcConfig: AuthProviderProps = {
  authority: "https://auth.snowse.duckdns.org/realms/advanced-frontend/",
  client_id: "bryce-oAuth2",
  redirect_uri: "http://localhost:5173/",
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

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <AuthProvider {...oidcConfig}>
        <App />
      </AuthProvider>
    </StrictMode>
  </BrowserRouter>
);
