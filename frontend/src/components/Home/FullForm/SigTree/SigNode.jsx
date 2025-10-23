// imports
import { useState, useEffect } from 'react'
import './SigNode.css'
import SigSide from './SigSide.jsx'

function SigNode(props) {
    // state variables for this component
    const [ui, setui] = useState({});
    const [red, setRed] = useState(false);
    const [sig, setSig] = useState();
    const [disp, setDisp] = useState(false);
    const uid = props.data.data;
    const x = props.data.x;
    const y = props.data.y;


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
  
        fetchSig(uid);
    }, []);

    const changeDisp = (e) => {
        if (!disp) {
            e.target.parentNode.parentNode.appendChild(e.target.parentNode);
        }
        setDisp(!disp);
        

    };

    // console.log(sig)
    /* --------------- RENDER -------------------------*/
    // if data is loaded show
    if (red){
        return (
            <>  
            <g>
                <circle className={sig.isSigned+'Node'} onClick={changeDisp}></circle>
                
                    {/*
                    NEED TO FIGURE OUT WHERE TO PUT THIS AND HOW TO IMPLEMENT WITH HOVER OF CIRCLE
                    <div className='sig-circle'>
                    <span className={sig.isSigned+'Check'}></span>
                        <div className='sig-box'>
                            <p>User: {ui.firstName + " " + ui.lastName}</p>
                            <p>Status: {sig.isSigned}</p>
                            {/*I Find this so disturbing for some reason still
                                sig.signatureDate && <p>Date: {new Date(sig.signatureDate).toLocaleString()}</p>
                            }
                    </div>
                </div>*/}
            </g>
            {disp && 
                <SigSide data={sig} x={x} y={y}/>}
            </>
        )
    }
}

export default SigNode
