import { useState } from 'react'
import './ShowSig.css'

function ShowSig(props) {

    return (
        <>
        <div className='sig-box'>
            <p>User: {props.data.user.firstName + " " + props.data.user.lastName }</p>
            <p>Status: {props.status}</p>
            {/*I Find this so disturbing for some reason still*/
                props.data.signatureDate && <p>Date: {props.data.signatureDate}</p>
            }
        </div>
        </>
    )
}

export default ShowSig
