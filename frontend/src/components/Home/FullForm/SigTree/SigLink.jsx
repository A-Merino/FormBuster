import { useState, useEffect } from 'react'
import './SigLink.css'

function SigLink(props) {

    const source = props.source;
    const dest = props.dest;

    // create state variables
    const [ready, setReady] = useState(false);
    const [src, setSrc] = useState();
    const [des, setDes] = useState({});



    useEffect(() => {

        const fetchSig = async (uid, setter, amReady) => {
            
                // post call
                await fetch(`http://localhost:3000/api/getSig`, {
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({id: uid})
                })
                .then(data => data.json())
                .then(res => {
                    setter(res.sig)
                    if (amReady !== null) {
                        setReady(true)

                    }
                    })
                .catch(e => console.log(e));
        }
  
        fetchSig(source.data, setSrc, null);
        fetchSig(dest.data, setDes, 0);
    }, []);


    if (ready){
    const goClass = src.isSigned[0].toUpperCase() + 'to' + src.isSigned[0].toUpperCase()

        return (
            <>
                <line className={goClass}
                    x1={source.x} x2={dest.x} y1={source.y} y2={dest.y}
                    strokeWidth={2}
                    ></line>
            </>
        )
    }
}

export default SigLink
