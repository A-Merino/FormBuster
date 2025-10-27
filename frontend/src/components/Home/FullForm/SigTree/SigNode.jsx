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
    // get prop data
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

    // when a node is clicked change display of information
    const changeDisp = (e) => {
        console.log(e.target.parentNode.parentNode)
        if (!disp) {
            e.target.parentNode.parentNode.appendChild(e.target.parentNode);
        }
        setDisp(!disp);
    
    };

    const windth = 0.8 * window.innerWidth;

    /* --------------- RENDER -------------------------*/
    // if data is loaded show
    if (red){
        return (
            <>  
            <g onClick={changeDisp}>
                <circle cx={x} cy={y} className={sig.isSigned+'Node'} ></circle>
                <text x={x + 35} y={y}>{ui.role}</text>
            </g>
            {disp && 
                <SigSide data={sig} us={ui} x={x} y={y}/>}
            </>
        )
    }
}

export default SigNode
