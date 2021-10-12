import ControlPanel from './ControlPanel/ControlPanel';
import DelayPanel from './DelayPanel/DelayPanel';
import Keyboard from './Keyboard/Keyboard';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="panels">
        <ControlPanel />
        <DelayPanel />
      </div>
      <div className="keybaord">
        <Keyboard />
      </div>
    </div>
  );
}

export default App;
