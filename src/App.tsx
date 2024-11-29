import './App.css';
import Meteors from './components/ui/meteors';
import ShinyButton from './components/ui/shiny-button';
import SparklesText from './components/ui/sparkles-text';

function App() {
  return (
    <div className="bg-gradient-to-t from-[#061734] to-[#000000] h-screen flex items-center justify-center max-w-screen-sm mx-auto">
      <div className="flex-row text-center text-white p-4">
        <Meteors number={30} />
        <SparklesText text="Jackdot" className="my-8" />
        <ShinyButton> Launch App </ShinyButton>
      </div>
    </div>
  );
}

export default App;
