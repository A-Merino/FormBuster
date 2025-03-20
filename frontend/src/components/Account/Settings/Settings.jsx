import { useState } from 'react'
import './Settings.css'
import ACSide from "./../ACSide/ACSide.jsx"



function Settings() {

  const [en, setEn] = useState('Enabled');

  // Here we would also switch boolean in database for user
  const switchEmail = (event) => {
    event.preventDefault();

    if (en === "Enabled") {
      setEn("Disabled");
    } else {
      setEn("Enabled");

    }
  }

  return (
    <>
      <ACSide/>
      <div id='setting-list'>
        <h1>Account Settings</h1>
        <div className="settings-container">
          <p>Email Notifications:</p>
          <button onClick={switchEmail}>{en}</button>
        </div>
        <div className="settings-container button-only">
          <button>Edit Account Information</button>
        </div>
      </div>
    </>
  )
}

export default Settings
