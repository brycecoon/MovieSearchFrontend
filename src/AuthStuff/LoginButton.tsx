// src/App.jsx
import { User } from "oidc-client-ts";
import { useAuth } from "react-oidc-context";
// import { useEffect } from "react";

function LoginButton() {
    const auth = useAuth();

    // useEffect(() => {
    //     console.log("new user");
    //     if (auth.user) {
    //         const date = new Date{(auth.user.expires_at ?? 0) * 1000}
    //         document.cookie = `auth_token=${auth.user.id_token}`;
    //     }
    // });

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
        console.log(User)
        return (
        <div>
            Hello {auth.user?.profile.sub}{" "}
            <button onClick={() => auth.removeUser()}>Log out</button>
        </div>
        );
    }

    return <button onClick={() => void auth.signinRedirect()}>Log in</button>;
}

export default LoginButton;