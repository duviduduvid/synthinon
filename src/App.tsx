import ControlPanel from './ControlPanel/ControlPanel';
import DelayPanel from './DelayPanel/DelayPanel';
import Keyboard from './Keyboard/Keyboard';
import ColorSelectorPanel from './ColorSelector/ColorSelectorPanel';
import LFOPanel from './LFOPanel/LFOPanel';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="upper-panel">
        <ControlPanel />
        <ColorSelectorPanel />
      </div>
      <div className="middle-panel">
        <DelayPanel />
        <LFOPanel />
      </div>
      <div className="lower-panel">
        <Keyboard />
      </div>
    </div>
  );
}

export default App;
