import { useState, useEffect } from 'react'
import './css/app.css'
import { nodeVer, chromeVer, electronVer, openWindow} from './js/core.js';
import TitleBar from './components/TitleBar'; // Import the new TitleBar component

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    nodeVer();
	chromeVer();
	electronVer();
	openWindow();
  }, []);
  
  return (
    <>
		<div id="borderarea">
        <TitleBar/>
		<div className="card">
		<h1 className="text-3xl font-bold uppercase">Vite + React</h1>
        <button id="openWindowBtn">Click me</button>
			<button onClick={() => setCount((count) => count + 1)}>
			count is {count}
			</button>
			<p className='m-5'>
				We are using Node.js <span id="node-version"></span>,
				Chromium <span id="chrome-version"></span>,
				and Electron <span id="electron-version"></span>.
			</p>
		</div>
		</div>
    </>
  )
}

export default App

