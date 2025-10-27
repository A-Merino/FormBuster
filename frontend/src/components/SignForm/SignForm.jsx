// react imports
import { useState, useContext, useEffect, useRef} from 'react';
import {useLocation, useNavigate, Link} from "react-router-dom";
import User from './../User/User.jsx';
import './SignForm.css';
import SigBox from './SigBox.jsx';

function SignForm() {

    const nav = useNavigate();
    const formRef = useRef(null);
    // Get the user context
    const {user, loggedIn} = useContext(User);
    const [account, setAccount] = user;
    const [signedIn, setSignedIn] = loggedIn;

    const [form, setForm] = useState({});
    const [temp, setTemp] = useState('');
    const [good, setGood] = useState(false);
    const [sigDisp, setSigDisp] = useState(null);

    const FID = useLocation().pathname.split('/').at(-1);




    useEffect( () => {
        // console.log(account.id)
        // if (!signedIn) {
        //     nav("/sign-in")
        // }
        // if (!account.forms.includes(FID)) {
        //     nav('/home')
        // }


        // calls api and sets response to form var
        const getFormData = async (formID) => {
            try {
                const resp = await fetch(`http://localhost:3000/api/getActive`, {
                            method :"POST",
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({id:formID})
                        });
                const data = await resp.json();
                setForm(data.form);
                getFormTemp(data.form.formType)
            } catch (err) {
                console.log(err);
            }
        }

        const getFormTemp = async (ft) => {
            try {
                // get data from api call
                const response = await fetch(`http://localhost:3000/api/getFormTemp`, {
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({formid: ft})
                });
                const data = await response.json();
                setTemp(data.temp) // set name to state variable
                setGood(true);
            } catch (e) {
                console.log(e)
            }
    }

        // get form id from url
        getFormData(FID);

    }, []);
    // console.log(form.formData)

    const inputAnswers = () => {
        let inputs = document.querySelectorAll('#form-container input');
        inputs = [...inputs]
        inputs.map(input => {

            const inType = input.name;
            input.placeholder = "";
            input.readOnly = true;
            input.disabled = true;
            if (input.type === 'checkbox'){
                if(form.formData[inType] === 'on'){
                    input.checked = true;
                
                }
                input.disabled = true;

            } else {
                input.value = form.formData[inType]

            }
        });
    }

    const displaySig = (e) => {

        if (e.target.name === "sign") {
            setSigDisp(true);
            const s = document.querySelector('#sign-button');
            s.style.backgroundColor = '#1b651b'
            const d = document.querySelector('#decline-button');
            d.style.backgroundColor = "var(--gray)"
        } else {
            setSigDisp(false);

            const s = document.querySelector('#sign-button');
            s.style = 'background-color:var(--gray);'
            const d = document.querySelector('#decline-button');
            d.style = "background-color: var(--red);"
        }
    }

    /* ----------- RENDER --------------------------*/
    if (good) {
        inputAnswers()
        return (
            <>
            <div ref={formRef} id="form-container" dangerouslySetInnerHTML={{__html: temp}}></div>
            <div className="choicePicks">
                <button id='sign-button' name="sign" onClick={displaySig}>Sign</button>
                <button id='decline-button' name="decline" onClick={displaySig}>Decline</button>
            </div>
            {sigDisp !== null &&
            <SigBox disp={sigDisp} fid={FID} ac={account.id}/>

        }
            </>
        )
    }
}

export default SignForm


