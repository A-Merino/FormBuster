// react imports
import { useState, useEffect } from 'react'
import {useLocation} from "react-router-dom";


import './FullForm.css'

function FullForm() {

    const [form, setForm] = useState({});
    const [good, setGood] = useState(false);
    const [g, setG] = useState({});
    // Form id from url
    const FID = useLocation().pathname.split('/').at(-1);

    const nodes = [
        {x:10, y:40},{x:40, y:10}
    ]

    useEffect( () => {
        // get form id from url
        fetchForm(FID);
    }, []);

    // calls api and sets response to form var
    const fetchForm = async (formID) => {
        try {
            const resp = await fetch(`http://localhost:3000/api/getActive`, {
                        method :"POST",
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({id:formID})
                    })
            const data = await resp.json();
            setForm(data.form);
            setGood(true);
        } catch (err) {
            console.log(err);
        }
    }



    if(good){
        return (
            <>
            <h1>{form.formType.name}</h1>

            <h3>Created at: {new Date(form.creationDate).toLocaleString()}</h3>



            </>
        )

    } else {
        return (
            <>
            <p>We appreciate your patience</p>
            </>)
    }

}

export default FullForm


