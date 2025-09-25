import { useState, useEffect } from 'react'
import './SigSide.css'

function SigSide() {

    // create state variables
    const [ready, setReady] = useState(true);
    const [src, setSrc] = useState();
    const [des, setDes] = useState({});



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


    if (ready){

        return (
            <>
                <div className="form-side-bar">
                    <p>Hey im herer</p>
                </div>
            </>
        )
    }
}

export default SigSide
