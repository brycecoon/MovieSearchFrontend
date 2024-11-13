import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { callAuthEndpoint } from "./AuthStuff/services/UserService";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import AllMovies from "./Pages/AllMovies";
import Navbar from "./Components/Layout/Navbar";
import AdminPage from "./Pages/AdminPage";
import "bootstrap-icons/font/bootstrap-icons.css";
import PageNotFound from "./Pages/404Page/PageNotFound";


function App() {
  const auth = useAuth();
  useEffect(() => {
    if (auth.user?.id_token) {
      callAuthEndpoint(auth.user?.id_token);
    }
  }, [auth.user?.id_token]);

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/allmovies" element={<AllMovies />}></Route>
        <Route
          path="/adminpage"
          element={
              <AdminPage />
          }
        ></Route>
        <Route path="/*" element={<PageNotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
