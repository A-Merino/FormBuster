// react imports
import { useState, useContext, useEffect } from 'react';
import './Inbox.css';
import InboxMessage from './InboxMessages/InboxMessage.jsx';
import InboxInteractionBar from './InboxInteractionBar/InboxInteractionBar.jsx';
import Menu from './../Menu/Menu.jsx';
import TopBar from "./../TopBar/TopBar.jsx";
import User from "./../User/User.jsx";

function Inbox() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    // Get the user context
    const { user, loggedIn } = useContext(User);
    const [account, setAccount] = user;
    const [signedIn, setSignedIn] = loggedIn;

    useEffect(() => {
        if (account?.id) {
            fetchInbox(account.id);
        }
    }, [account?.id]);

    const fetchInbox = async (userID) => {
        try {
            // Step 1: Get inbox messages
            const resp = await fetch("http://localhost:3000/api/findInboxMessages", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: userID })
            });
            const data = await resp.json();

            // Step 2: Get form names for each message
            const messagesWithNames = await Promise.all(
                data.map(async (msg) => {
                    try {
                        const formResp = await fetch(`http://localhost:3000/api/getActive`, {
                            method :"POST",
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({id: msg.formID})
                        })
                        const formData = await formResp.json();

                        const nameResp = await fetch("http://localhost:3000/api/getFormName", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ formid: formData.form.formType})
                        });
                        const nameData = await nameResp.json();
                        return { ...msg, formName: nameData.name || "Untitled Form" };
                    } catch (err) {
                        console.error("Error fetching form name:", err);
                        return { ...msg, formName: "Unknown Form" };
                    }
                })
            );

            setMessages(messagesWithNames);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching inbox:", err);
        }
    };

    /* RENDER ------------------------*/
    return (
        <>
            <TopBar />
            <Menu />
            <div id="inbox-main-div">
                <h2>Inbox</h2>
                <div id="inbox-window-div">
                    <InboxInteractionBar
                        onRefresh={() => fetchInbox(account.id)}
                        onMarkAllRead={async () => {
                            await fetch("http://localhost:3000/api/markAllRead", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ userId: account.id }),
                            });
                            fetchInbox(account.id); // refresh after marking read
                        }}
                        onDeleteAllRead={async () => {
                            await fetch("http://localhost:3000/api/deleteAllRead", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ userId: account.id }),
                            });
                            fetchInbox(account.id); // refresh after deletion
                        }}
                    />
                    <div id="inbox-scroll-window">
                        {loading ? (
                            <p>Loading messages...</p>
                        ) : messages.length === 0 ? (
                            <p>No messages found</p>
                        ) : (
                            messages.map((msg) => (
                                <InboxMessage
                                    key={msg.id}
                                    formName={msg.formName}
                                    formID={msg.formID}
                                    rejected={msg.rejected}
                                    reason={msg.reason}
                                    read={msg.read}
                                    type={msg.type}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Inbox;