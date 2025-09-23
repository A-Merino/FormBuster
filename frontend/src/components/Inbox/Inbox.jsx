// imports
import { useState } from 'react'
import './Inbox.css'
import InboxMessage from './InboxMessages/InboxMessage.jsx'
import InboxInteractionBar from './InboxInteractionBar/InboxInteractionBar.jsx'
import Menu from './../Menu/Menu.jsx'
import TopBar from "./../TopBar/TopBar.jsx"

function Inbox() {

    /* RENDER ------------------------*/
    return (
    <>
        <TopBar/>
        <Menu/>
        <div id="inbox-main-div">
            <h2>Inbox</h2>
            <div id="inbox-window-div">
                <InboxInteractionBar/>
                <div id="inbox-scroll-window">
                {// Need to do something here
                }
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
