// imports
import { useState, useEffect } from 'react'
import './SigSide.css'

function SigSide(props) {

    // create state variables
    const [ready, setReady] = useState(true);
    const [src, setSrc] = useState();
    const [des, setDes] = useState({});

    const sig = props.data;
    const ui = props.us;

    const windth = 0.8 * window.innerWidth - 350;

    /* RENDER --------------------*/
    if (ready){

        return (
            <><g>
                <rect className={`pop-back ${sig.isSigned}Node`} x={windth} y={props.y - 30} width={300} height={100} rx={5} ry={5}></rect>
                <text className='pop-text' x={windth + 5} y={props.y - 10}>ID: {sig.user}</text>
                <text className='pop-text' x={windth + 5} y={props.y + 10}>Name: {ui.firstName + ' ' + ui.lastName}</text>
                {ui.role == 'student' && <text className='pop-text' x={windth + 5} y={props.y + 30}>Major: {ui.major}</text>}
                {ui.role == 'staff' && <text className='pop-text' x={windth + 5} y={props.y + 30}>College: {ui.major}</text>}
                <text className='pop-text' x={windth + 5} y={props.y + 50}>Email: <a class='g-email' href={`mailto:${ui.email}`}>{ui.email}</a></text>

            </g>
            </>
        )
    }
}

export default SigSide
