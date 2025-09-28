// imports
import { useState, useEffect } from 'react'
import './Inbox.css'
import InboxMessage from './InboxMessages/InboxMessage.jsx'
import InboxInteractionBar from './InboxInteractionBar/InboxInteractionBar.jsx'
import Menu from './../Menu/Menu.jsx'
import TopBar from "./../TopBar/TopBar.jsx"

function Inbox({ userId }) {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMessages() {
            try {
                const res = await fetch(`http://localhost:3000/api/findInboxMessages/${userId}`);
                const data = await res.json();
                console.log(data);
                setMessages(data);
            } catch (err) {
                console.error("Error fetching inbox messages:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchMessages();
    }, [userId]);

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