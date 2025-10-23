// imports
import { useState, useEffect } from 'react'
import './SigSide.css'

function SigSide(props) {

    // create state variables
    const [ready, setReady] = useState(true);
    const [src, setSrc] = useState();
    const [des, setDes] = useState({});

    const sig = props.data;


    // useEffect(() => {

    //     const fetchSig = async (uid, setter, amReady) => {
            
    //             // post call
    //             await fetch(`http://localhost:3000/api/getSig`, {
    //                 method: "POST",
    //                 headers: {'Content-Type': 'application/json'},
    //                 body: JSON.stringify({id: uid})
    //             })
    //             .then(data => data.json())
    //             .then(res => {
    //                 setter(res.sig)
    //                 if (amReady !== null) {
    //                     setReady(true)

    //                 }
    //                 })
    //             .catch(e => console.log(e));
    //     }
  
    //     fetchSig(source.data, setSrc, null);
    //     fetchSig(dest.data, setDes, 0);
    // }, []);


    /* RENDER --------------------*/
    console.log(props)
    if (ready){

        return (
            <>
                <rect className="pop-back" x={props.x} y={props.y} width={200} height={200}></rect>
                <text className='pop-text' x={props.x} y={props.y}>{sig.user}</text>
            </>
        )
    }
}

export default SigSide
