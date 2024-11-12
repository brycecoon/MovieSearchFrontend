import { useEffect } from 'react'
import './App.css'
import LoginButton from './AuthStuff/LoginButton'
import { useAuth } from 'react-oidc-context';
import { callAuthEndpoint } from './AuthStuff/services/UserService';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import AllMovies from './Pages/AllMovies';
import Navbar from './Components/Layout/Navbar';

function App() {
  const auth = useAuth();
  useEffect(() => {
    if (auth.user?.id_token) {
      callAuthEndpoint(auth.user?.id_token)
    }
  }, [auth.user?.id_token])

  return (
    <>
    <h1 className="bg-green-500">Hello</h1>
      {/* <LoginButton/> */}
      <Navbar/>


      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/allmovies" element={<AllMovies/>}></Route>
      </Routes>
    </>
  )
}

export default App
