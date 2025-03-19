import { useState, useEffect } from 'react'
import './css/app.css'
import {xD} from './js/core.js';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    xD();
  }, []);
  
  return (
    <>
		<div id="titleBar">
			<div id="appName">
				<img id="appLogo" src="/assets/logo/appicon.png" className='w-[25px] h-[25px]'></img>
				<span id="title"></span>
				<span id="version"></span>
			</div>
			<div id="ctrl-btn">
				<span id="minbtn">-</span>
				<span id="maxbtn">+</span>
				<span id="closebtn">x</span>
			</div>
		</div>
		<h1 className="text-3xl font-bold uppercase">Vite + React</h1>
		<div className="card">
			<button onClick={() => setCount((count) => count + 1)}>
			count is {count}
			</button>
			<p className='m-5'>
				We are using Node.js <span id="node-version"></span>,
				Chromium <span id="chrome-version"></span>,
				and Electron <span id="electron-version"></span>.
			</p>
		</div>
    </>
  )
}

export default App
