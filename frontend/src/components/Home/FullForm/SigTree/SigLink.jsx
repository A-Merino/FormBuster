import { useState, useEffect } from 'react'
import './SigLink.css'

function SigLink(props) {
    // grab props data
    const source = props.source;
    const dest = props.dest;
    // console.log(source)

    // create state variables
    const [ready, setReady] = useState(false);
    const [src, setSrc] = useState();
    const [des, setDes] = useState({});

    useEffect(() => {

        // get signature
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
        
        // get both signatures seperately  
        fetchSig(source.data, setSrc, null);
        fetchSig(dest.data, setDes, 0);
    }, []);

    // after both sig data is loaded
    if (ready){
        // create our class name for this link
        // The class name will determine the link color and if it is dashed
        const goClass = src.isSigned[0].toUpperCase() + 'to' + des.isSigned[0].toUpperCase()
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
