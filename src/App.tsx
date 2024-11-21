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
import InTheatres from "./Pages/InTheatres";
import MovieDetails from "./Pages/MovieDetails";
import MyLists from "./Pages/MyLists";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ActorDirector from "./Pages/ActorDirector";
import ActorDetails from "./Pages/ActorDetails";


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
        <Route path="/inTheatres" element={<InTheatres />}></Route>
        <Route path="/myLists" element={<MyLists />}></Route>
        <Route path="/actordirector" element={<ActorDirector />}></Route>
        <Route path="/movieDetails/:id" element={<MovieDetails />}></Route>
        <Route path="/actorDetails/:id" element={<ActorDetails />}></Route>
        <Route
          path="/adminpage"
          element={
              <AdminPage />
          }
        ></Route>
        <Route path="/*" element={<PageNotFound />}></Route>
      </Routes>

      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;
