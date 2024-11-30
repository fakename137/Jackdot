import "./App.css";
import Meteors from "./components/ui/meteors";
import ShinyButton from "./components/ui/shiny-button";
import SparklesText from "./components/ui/sparkles-text";
import { useEffect, useState } from "react";
import Login from "./components/magic/Login";
import MagicProvider from "./components/magic/MagicProvider";
function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("token") ?? "");
  }, [setToken]);

  return (
    <div className="bg-gradient-to-t from-[#061734] to-[#000000] h-screen flex items-center justify-center max-w-screen-sm mx-auto">
      <div className="flex-row text-center text-white p-4">
        <Meteors number={30} />
        <SparklesText text="Jackdot" className="my-8" />
        {/* <ShinyButton> Launch App </ShinyButton> */}
        <MagicProvider>
          <Login token={token} setToken={setToken} />
        </MagicProvider>
      </div>
    </div>
  );
}

export default App;
