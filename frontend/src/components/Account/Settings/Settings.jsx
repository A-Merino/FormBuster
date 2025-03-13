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
      <p>Email Notifications:</p>
      <button onClick={switchEmail}>{en}</button>
      </div>
    </>
  )
}

export default Settings
