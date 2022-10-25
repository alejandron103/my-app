import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

export default function App() {
  const [isReadyForInstall, setIsReadyForInstall] = useState(false);
  const [isIOS, setIsIOS] = useState(false)
  const [promptEvent, setPromptEvent] = useState({})

  useEffect(() => {
    isThisDeviceRunningiOS()
    window.addEventListener("beforeinstallprompt", (event) => {
      // Prevent the mini-infobar from appearing on mobile.
      event.preventDefault();
      alert("👍", "beforeinstallprompt", event);
      // Stash the event so it can be triggered later.
      window.deferredPrompt = event;
      setPromptEvent(event)
      // Remove the 'hidden' class from the install button container.
      // setIsReadyForInstall(true);
      
    });
  }, []);

  async function downloadApp() {
    console.log("👍", "butInstall-clicked");
    // const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      // The deferred prompt isn't available.
      console.log("oops, no prompt event guardado en window");
      return;
    }
    // Show the install prompt.
    setIsReadyForInstall(true);
    await promptEvent.prompt();
    alert("promtp",promptEvent)
    // Log the result
    const result = await promptEvent.userChoice;
    console.log("👍", "userChoice", result);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
    // Hide the install button.
  }

  function isThisDeviceRunningiOS(){
    if (['iPad Simulator', 'iPhone Simulator','iPod Simulator', 'iPad','iPhone','iPod'].includes(navigator.platform)){
      setIsIOS(true);
    }
    // iPad on iOS 13  
    else if (navigator.userAgent.includes("Mac") && "ontouchend" in document){
      setIsIOS(true);
    }   
    else {
      setIsIOS(false);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
      { isIOS && <button onClick={downloadApp}>download</button> }
      { isReadyForInstall && <button onClick={downloadApp}>ios</button> }
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React pwa
        </a>
      </header>
    </div>
  );
}