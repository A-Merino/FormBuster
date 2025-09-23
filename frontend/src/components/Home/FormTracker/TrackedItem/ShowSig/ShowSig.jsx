// imports
import { useState, useEffect } from 'react'
import './ShowSig.css'

function ShowSig(props) {
    // state variables
    const [user, setUser] = useState({});
    const [ready, setReady] = useState(false);
    const [sig, setSig] = useState();

    // save props
    const uid = props.data


    useEffect(() => {
        // collect the signature and user of signature from api
        const fetchSig = async (uid) => {
            
                // post call
                await fetch(`http://localhost:3000/api/getSigAndUser`, {
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({id: uid})
                })
                // using Promise.then() this time because it worked this way
                // same as try catch statements (i think)
                .then(data => data.json())
                .then(res => {
                    // set state variables
                    setSig(res.sig)
                    setUser(res.user)
                    setReady(true)
                    })
                .catch(e => console.log(e));
        }
        // run api call on load
        fetchSig(uid);
    }, []);


    /* RENDER ------------------------------ */
    if (ready) {
        return (
            <>
            <div className='sig-circle'>
                <span className={sig.isSigned+'Check'}></span>
                    <div className='sig-box'>
                        <p>User: {user.firstName + " " + user.lastName}</p>
                        <p>Status: {sig.isSigned}</p>
                        {// check if there is a signature date, if so then show it
                            sig.signatureDate && <p>Date: {new Date(sig.signatureDate).toLocaleString()}</p>
                        }
                </div>
            </div>
            </>
        )
    }
}

export default ShowSig
