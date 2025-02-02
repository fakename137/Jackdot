import './App.css';
import Meteors from './components/ui/meteors';
import ShinyButton from './components/ui/shiny-button';
import SparklesText from './components/ui/sparkles-text';
import { useEffect, useState } from 'react';
import Login from './components/magic/Login';
import MagicProvider from './components/magic/MagicProvider';
import { usePrivy } from '@privy-io/react-auth';
import { useLogin } from '@privy-io/react-auth';
function App() {
  const [token, setToken] = useState('');
  const { ready, authenticated } = usePrivy();
  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated);
  useEffect(() => {
    setToken(localStorage.getItem('token') ?? '');
  }, [setToken]);

  const { login } = useLogin({
    onComplete: (
      user,
      isNewUser,
      wasAlreadyAuthenticated,
      loginMethod,
      linkedAccount
    ) => {
      window.location.href = '/pool';
      console.log(
        user,
        isNewUser,
        wasAlreadyAuthenticated,
        loginMethod,
        linkedAccount
      );

      // Any logic you'd like to execute if the user is/becomes authenticated while this
      // component is mounted
    },
    onError: (error) => {
      console.log(error);
      // Any logic you'd like to execute after a user exits the login flow or there is an error
    },
  });
  return (
    <div className="bg-gradient-to-t from-[#061734] to-[#000000] h-screen flex items-center justify-center  mx-auto">
      <div className="flex-row text-center text-white p-4">
        <Meteors number={30} />
        <SparklesText text="Jackdot" className="my-8" />
        <ShinyButton disabled={disableLogin} onClick={login}>
          Launch App
        </ShinyButton>
        {/* <MagicProvider>
          <Login token={token} setToken={setToken} />
        </MagicProvider> */}
      </div>
    </div>
  );
}

export default App;
