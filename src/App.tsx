import { useEffect } from 'react'
import './App.css'
import LoginButton from './AuthStuff/LoginButton'
import { useAuth } from 'react-oidc-context';
import { callAuthEndpoint } from './AuthStuff/services/UserService';

function App() {
  const auth = useAuth();
  useEffect(() => {
    if (auth.user?.id_token) {
      callAuthEndpoint(auth.user?.id_token)
    }
  }, [auth.user?.id_token])

  return (
    <>
      <LoginButton/>
    </>
  )
}

export default App
