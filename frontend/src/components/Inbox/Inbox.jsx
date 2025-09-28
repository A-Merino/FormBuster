// react imports
import { useState, useContext, useEffect } from 'react'
import './Inbox.css'
import InboxMessage from './InboxMessages/InboxMessage.jsx'
import InboxInteractionBar from './InboxInteractionBar/InboxInteractionBar.jsx'
import Menu from './../Menu/Menu.jsx'
import TopBar from "./../TopBar/TopBar.jsx"
import User from "./../User/User.jsx"

function Inbox() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    // Get the user context
    const {user, loggedIn} = useContext(User);
    const [account, setAccount] = user;
    const [signedIn, setSignedIn] = loggedIn;

    useEffect(() => {
        const fetchInbox = async (userID) => {
            try {
                const resp = await fetch("http://localhost:3000/api/findInboxMessages", {
                            method :"POST",
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({id:userID})
                        })
                const data = await resp.json();
                console.log(data);
                setMessages(data);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        fetchInbox(account.id);
    }, []);

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
                        {loading ? (
                            <p>Loading messages...</p>
                        ) : messages.length === 0 ? (
                            <p>No messages found</p>
                        ) : (
                            messages.map((msg) => (
                                <InboxMessage
                                    key={msg.id}
                                    formID={msg.formID}
                                    rejected={msg.rejected}
                                    reason={msg.reason}
                                    read={msg.read}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Inbox