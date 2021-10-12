import ControlPanel from './ControlPanel/ControlPanel';
import DelayPanel from './DelayPanel/DelayPanel';
import Keyboard from './Keyboard/Keyboard';
import ColorSelectorPanel from './ColorSelector/ColorSelectorPanel';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="panels">
        <ControlPanel />
        <DelayPanel />
        <ColorSelectorPanel />
      </div>
      <div className="keybaord">
        <Keyboard />
      </div>
    </div>
  );
}

export default App;
