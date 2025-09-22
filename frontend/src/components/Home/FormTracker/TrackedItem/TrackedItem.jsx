import { useState, useContext, useEffect } from 'react'
import './TrackedItem.css'
import {Link} from 'react-router'
import ShowSig from './ShowSig/ShowSig.jsx'
import Warning from './../Warning/Warning.jsx'
import User from "./../../../User/User.jsx"

function TrackedItem(props) {
    // Get the user context
    const {user, loggedIn} = useContext(User);
    const [account, setAccount] = user;
    const [signedIn, setSignedIn] = loggedIn;

    const formid = props.data;

    const curDate = new Date();
    const oldDate = new Date(props.data.creationDate);
    const [red, setRed] = useState(false);
    const [fn, setFN] = useState("");
    const [disp, setDisp] = useState();


    const [form, setForm] = useState({});




    useEffect(() => {
        const fetchForm = async (formid) => {

            try {
            // for each form string id 
                // get the data of the form
                const response = await fetch(`http://localhost:3000/api/getActive`, {
                    method :"POST",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({id:formid})
                });
                const data = await response.json(); // json the data
                setForm(data.form); // append to end of list
                setRed(true);
            } catch (error) {
                // if error then print
                console.error(error);
            }
        }
        
        fetchForm(formid);
        
    },[])
    
    // Gets the Form name from the database, using the form ID
    const getFormName = async () => {
        try {
            // get data from api call
            const response = await fetch(`http://localhost:3000/api/getFormName`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({formid: form.formType})
            });
            const data = await response.json();
            setFN(data.name) // set name to state variable
        } catch (e) {
            console.log(e)
        }
    }


    if (red) {
        getFormName()
    return (
        <>
            <div className="trackedForm">

                <div className="form-info">
                    <h3 className='trackerHeader'>{fn}</h3>
                    <p>Date Created: {new Date(form.creationDate).toLocaleString()}</p>
                </div>

                <div className="signatures">
                {form.signatures.map((sign) => {

                    return <ShowSig data={sign} key={sign}/>
                    

                })}
                </div>

                {/*Here is where the exclamation mark thingy should go
                    Maybe we use some type of time comparison function
                    as well as if you are a user who hasn't signed*/}
                <Warning data={new Date() - new Date(form.creationDate)}/>


                <Link to={`/form/${formid}`}>More Details</Link>
            </div>
        </>
    )
    }
}

export default TrackedItem
