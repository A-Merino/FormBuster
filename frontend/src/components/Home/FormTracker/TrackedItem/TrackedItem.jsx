import { useState, useContext, useEffect } from 'react'
import './TrackedItem.css'
import {Link} from 'react-router'
import ShowSig from './ShowSig/ShowSig.jsx'
import Warning from './../Warning/Warning.jsx'

function TrackedItem(props) {

    const curDate = new Date();
    const oldDate = new Date(props.data.creationDate);
    const [sigs, setSigs] = useState([]);
    const [red, setRed] = useState(false);
    const [fn, setFN] = useState("")
    const [disp, setDisp] = useState();


    useEffect(() => {
        // fetches a signature from the database and saves data in array 
        const fetchSig = async () => {
            try {
                props.data.signatures.map(async sign => {
                    // post call
                    const response = await fetch(`http://localhost:3000/api/getSig`, {
                        method: "POST",
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({id: sign})
                    });
                    const data = await response.json();
                    setSigs([...sigs, data.sig]); // get data and add it to state array
                });
            } catch (err) {
                console.log(err)
            }

        }      

        // call api
        fetchSig();

        getFormName();
        setRed(true);


    },[])


    // Gets the Form name from the database, using the form ID
    const getFormName = async () => {
        try {
            // get data from api call
            const response = await fetch(`http://localhost:3000/api/getFormName`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({formid: props.data.formType})
            });
            const data = await response.json();
            setFN(data.name) // set name to state variable
        } catch (e) {
            console.log(e)
        } 
    }



    let g = 0
    if (red) {

    return (
        <>
            <div className="trackedForm">

                <div className="form-info">
                    <h3 className='trackerHeader'>{fn}</h3>
                    <p>Date Created: {oldDate.toLocaleString()}</p>
                </div>

                <div className="signatures">
                {sigs.map((sign) => {
                    if (sign.isSigned === "signed"){
                        return <div className='sig-circle'>
                                <span className="signedCheck"></span>
                                <ShowSig data={sign} f={g} status="Signed" key={sign.user}/>
                                </div> 

                    }else if (sign.isSigned === "unsigned"){
                        return <div className='sig-circle'>
                                    <span className="unsignedCheck"></span> 
                                    <ShowSig data={sign} f={g} status="Not signed" key={sign.user}/>
                                </div>
                    }else if (sign.isSigned === "rejected"){
                        return <div className='sig-circle'>
                                    <span className="rejectedCheck"></span> 
                                    <ShowSig data={sign} f={g} status="Rejected" key={sign.user}/>
                                </div>
                    }else if (sign.isSigned === "na"){
                        return <div className='sig-circle'>
                                    <span className="naCheck"></span> 
                                    <ShowSig data={sign} f={g} status="N/A" key={sign.user}/>
                                </div>
                    }

                })}
                </div>

                {/*Here is where the exclamation mark thingy should go
                    Maybe we use some type of time comparison function
                    as well as if you are a user who hasn't signed*/}
                <Warning data={curDate - oldDate}/>


                <Link to={`/form/${props.data.id}`}>More Details</Link>
            </div>
        </>
    )
    }
}

export default TrackedItem
