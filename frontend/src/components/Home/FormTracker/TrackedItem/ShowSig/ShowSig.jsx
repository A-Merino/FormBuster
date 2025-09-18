import { useState, useEffect } from 'react'
import './ShowSig.css'

function ShowSig(props) {
    const [ui, setui] = useState({});
    const [red, setRed] = useState(false);

    useEffect(() => {
        fetchUser(props.data.user);
    }, []);
    // fetches user information from user ID
    const fetchUser = async (user) => {
        try {
            const response = await fetch(`http://localhost:3000/api/getUser`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({id: user})
            })
            const data = await response.json();
            setui(data.account);
            setRed(true);
        } catch (error) {
            console.error(error);
        }
    }


    if (red) {

        return (
            <>
            <div className='sig-box'>
                <p>User: {ui.firstName + " " + ui.lastName}</p>
                <p>Status: {props.status}</p>
                {/*I Find this so disturbing for some reason still*/
                    props.data.signatureDate && <p>Date: {props.data.signatureDate}</p>
                }
            </div>
            </>
        )
    }
}

export default ShowSig
