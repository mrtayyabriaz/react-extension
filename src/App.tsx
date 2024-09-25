// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { useState } from 'react';

function App() {
  const [color, setColor] = useState('purple');

  chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
      text: "Tayyab",
    });
  });

  const myfun = async () => {
    const [tab] = await chrome.tabs.query({ active: true });

    chrome.scripting.executeScript<string[], void>({
      target: { tabId: tab.id! },
      args: [color],
      func: (color) => {
        document.body.style.backgroundColor = color;
        // alert('Hello from Tayyab!');
      },
    });
  }
  return (
    <>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> */}
      <h1>Change Body Color</h1>
      <div className="card">
        <input type="color" value={color}
          onChange={(e) => {
            setColor(e.target.value);
            myfun()
          }
          } />
        {/* <button onClick={() => myfun()}>
          Click ME
        </button> */}
        {/* <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p> */}
      </div>
      {/* <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
