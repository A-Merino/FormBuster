import { useState } from 'react'
import './Inbox.css'
import InboxMessage from './InboxMessages/InboxMessage.jsx'
import InboxInteractionBar from './InboxInteractionBar/InboxInteractionBar.jsx'

function Inbox() {

  return (
    <>
      <div id="inbox-main-div">
        <h2>Inbox</h2>
        <div id="inbox-window-div">
          <InboxInteractionBar/>
          <div id="inbox-scroll-window">
            <InboxMessage/>
            <InboxMessage/>
            <InboxMessage/>
            <InboxMessage/>
            <InboxMessage/>
            <InboxMessage/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Inbox 
