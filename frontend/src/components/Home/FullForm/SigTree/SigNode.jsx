import { useState, useEffect } from 'react'
import './SigNode.css'

function SigNode(props) {


    const [ui, setui] = useState({});
    const [red, setRed] = useState(false);
    const [sig, setSig] = useState();

    const uid = props.data


    useEffect(() => {

        const fetchSig = async (uid) => {
            
                // post call
                await fetch(`http://localhost:3000/api/getSigAndUser`, {
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({id: uid})
                })
                .then(data => data.json())
                .then(res => {
                    // fetchUser(res.sig.user)
                    setSig(res.sig)
                    setui(res.user)
                    setRed(true)
                    })
                .catch(e => console.log(e));
        }
  
        fetchSig(uid);
    }, []);

    if (red){

        return (
            <>
            <div className='sig-circle'>
                    <span className={sig.isSigned+'Check'}></span>
                        <div className='sig-box'>
                            <p>User: {ui.firstName + " " + ui.lastName}</p>
                            <p>Status: {sig.isSigned}</p>
                            {/*I Find this so disturbing for some reason still*/
                                sig.signatureDate && <p>Date: {new Date(sig.signatureDate).toLocaleString()}</p>
                            }
                    </div>
                </div>
            </>
        )
    }
}

export default SigNode
