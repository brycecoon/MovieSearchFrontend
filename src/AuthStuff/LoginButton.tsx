// src/App.jsx
import { useAuth } from "react-oidc-context";
// import { useEffect } from "react";

function LoginButton() {
  const auth = useAuth();

  switch (auth.activeNavigator) {
    case "signinSilent":
      return <div>Signing you in...</div>;
    case "signoutRedirect":
      return <div>Signing you out...</div>;
  }

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Oops... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div>
        <div onClick={() => auth.removeUser()}>
          {" "}
          <div className="nav-item flex flex-row pb-2 text-gray-900 relative group transition duration-300 ease-in-out">
            <i className={`bi bi-door-closed mr-2`}></i>
            <div className="nav-text">Log Out</div>
            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-slate-700 transition-all duration-300 ease-in-out group-hover:w-full"></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div onClick={() => void auth.signinRedirect()}>
      <div className="nav-item flex flex-row pb-2 text-gray-900 relative group transition duration-300 ease-in-out">
        <i className={`bi bi-door-open mr-2`}></i>
        <div className="nav-text">Log In</div>
        <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-slate-700 transition-all duration-300 ease-in-out group-hover:w-full"></span>
      </div>
    </div>
  );
}

export default LoginButton;
