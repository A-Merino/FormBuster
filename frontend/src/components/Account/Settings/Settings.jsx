//imports
import { useState } from 'react'
import './Settings.css'
import ACSide from "./../ACSide/ACSide.jsx"

function Settings() {

    const [en, setEn] = useState('enable');
  // Here we would also switch boolean in database for user
    const switchEmail = (event) => {
        event.preventDefault();
        const but = document.querySelector('#notif-bl');
        if (en === "enable") {
            setEn("disable");
            but.className = 'not-ds';
        } else {
            setEn("enable");
            but.className = 'not-en';

        }
  }

  return (
    <>
      <ACSide/>
      <div id='setting-list'>
        <h1>Account Settings</h1>
        <div className="settings-container">
          <p><strong>Email Notifications:</strong></p>
          <button id='notif-bl' className='not-en' onClick={switchEmail}>Click to {en}</button>
        </div>
        <div className="settings-container button-only">
          <button>Edit Account Information</button>
        </div>
      </div>
    </>
  )
}

export default Settings
