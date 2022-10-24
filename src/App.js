import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

export default function App() {
  const [isReadyForInstall, setIsReadyForInstall] = useState(false);
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    let prompt;
    alert("entro")
    let installButton = document.createElement('button');
    getOperatingSystem()
    window.addEventListener("beforeinstallprompt", (event) => {
      // Prevent the mini-infobar from appearing on mobile.
      event.preventDefault();
      console.log("👍", "beforeinstallprompt", event);
      alert("👍", "beforeinstallprompt", event)
      // Stash the event so it can be triggered later.
      window.deferredPrompt = event;
      prompt = event;
      // Remove the 'hidden' class from the install button container.
      setIsReadyForInstall(true);
      
    });
    installButton.addEventListener('click', function(){
      prompt.prompt();
   })
  }, []);

  async function downloadApp() {
    console.log("👍", "butInstall-clicked");
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      // The deferred prompt isn't available.
      console.log("oops, no prompt event guardado en window");
      return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    const result = await promptEvent.userChoice;
    console.log("👍", "userChoice", result);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
    // Hide the install button.
    setIsReadyForInstall(false);
  }

  function getOperatingSystem() {
    if (window.navigator.appVersion.indexOf('Win') !== -1) { setIsIOS(false) }
    if (window.navigator.appVersion.indexOf('Mac') !== -1) { setIsIOS(true) }
    if (window.navigator.appVersion.indexOf('X11') !== -1) { setIsIOS(false) }
    if (window.navigator.appVersion.indexOf('Linux') !== -1) { setIsIOS(false) }
  }

  return (
    <div className="App">
      <header className="App-header">
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