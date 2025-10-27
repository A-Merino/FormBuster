import { useState, useEffect } from 'react'
import './SignBar.css'

function SignBar(props) {
    const sigID = props.data;
    const [ui, setui] = useState({});
    const [sig, setSig] = useState();
    const [red, setRed] = useState(false);

    useEffect(() => {
        // get the signature information
        const fetchSig = async (uid) => {
            
                // post call
                await fetch(`http://localhost:3000/api/getSigAndUser`, {
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({id: uid})
                })
                .then(data => data.json())
                .then(res => {
                    setSig(res.sig)
                    setui(res.user)
                    setRed(true)
                    })
                .catch(e => console.log(e));
        }
  
        fetchSig(sigID);
    }, []);

    if (red) {
        let value;
        if (sig.isSigned === 'rejected' || sig.isSigned === 'signed') {
            value = ui.firstName + ' ' + ui.lastName
        }



        
        return (
            <>
                <label>
                    Signature: 
                    <input disabled={true} readOnly={true} value={value}></input>
                </label>
            </>
        )
    }
}

export default SignBar
