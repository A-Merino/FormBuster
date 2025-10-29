// imports
import { useState, useContext } from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import './SigBox.css';
import User from './../User/User.jsx';

function SigBox(props) {

    // create nav and get sign/decline info
    const which = props.disp;
    const nav = useNavigate();

    // Get userContext and state var
    const {user, loggedIn} = useContext(User);
    const [account, setAccount] = user;
    const [signedIn, setSignedIn] = loggedIn;
    const [msg, setMsg] = useState('');

    // create signature id from info we have
    const sigID = `${props.fid}_${props.ac}`;

    // run when we submit a signature
    const submitSig = (e) => {
        e.preventDefault();

        // get the inputs from the form
        let inputs = document.querySelector(".new-sig form");
        inputs = [...inputs]

        // check if there are any empty ones
        let output = []
        inputs.map(input => {
            if (input.value === ''){
                output.push(input.name)
            }
        });

        // if there are print out and return the alert to window
        if (output.length > 0) {
            let f = '';
            output.map(d => {
                f += `${d}, `
            }) ;
            f = f.substring(0, f.length-2);

            return alert(`${f} field(s) must be filled out`);
        } else { // if all inputs are filled
            if (which) { // check if signing
                // update the Signature object in the backend
                const updateSig = async () => {
                    try {
                        const resp = await fetch(`http://localhost:3000/api/updateSignature`, {
                                    method :"POST",
                                    headers: {'Content-Type': 'application/json'},
                                    body: JSON.stringify({sigid:sigID, formid: props.fid})
                                });
                        // get the response to see if all is well
                        const data = await resp.json();
                        setMsg(data.msg);
                        lastStep();

                    } catch (err) {
                        console.log(err);
                    }
                }
                updateSig(); // driver for above function

            } else { // else we are declining
                const decSig = async () => {
                    try {
                        const resp = await fetch(`http://localhost:3000/api/updateSignature`, {
                                    method :"POST",
                                    headers: {'Content-Type': 'application/json'},
                                    body: JSON.stringify({sigid:sigID, formid: props.fid, comm: inputs[1].value})
                                });
                        // get the response to see if all is well
                        const data = await resp.json();
                        setMsg(data.msg);
                        lastStep();
                        console.log(data.msg);
                    } catch (err) {
                        console.log(err);
                    }
                }
                decSig(); // driver for above function
            }
            const lastStep = () => {

                // if a success go to /home
                if (msg[0] === "S") {
                    nav('/home');
                } else { // reload page and pop alert that something went wrong
                    alert(msg);
                    nav(useLocation().pathname);
                }
            }
        }
    }

    const moveWind = () => {
        window.scrollTo(0, document.body.scrollHeight);
        console.log('MOVE THE WINDOW');
    }



    /* --------- RENDER ---------------------------------*/
    if (which) {
        return (
            <>
            <div className="new-sig">
                <form action={null}>
                <label>
                    <input placeholder="Signature" type='text' name='Signature' required></input>
                </label>
                </form>
                <button onClick={submitSig}>Submit</button>
            </div>
            {moveWind()}

            </>
        )

    } else {
        return (
            <>
            <div className="new-sig">
                <form action={null}>
                <label>
                    <input placeholder="Signature" type='text' name='Signature' required></input>
                </label>
                <label>Comment:
                    <textarea name='Comment' rows='10' cols='50' placeholder='Enter reason for declining...' required></textarea>
                </label>
                </form>
                    <button onClick={submitSig}>Submit</button>
            </div>
            {moveWind()}

            </>
        )
    }
}

export default SigBox
