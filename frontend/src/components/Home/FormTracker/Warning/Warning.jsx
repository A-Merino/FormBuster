// imports
import { useState } from 'react'
import './Warning.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faExclamation } from '@fortawesome/free-solid-svg-icons'

function Warning(props) {

    // save props
    const time = props.data 
    // calculate the days from difference in milliseconds 
    //                     mil     sec   min  hour day
    const days = parseInt(time / (1000 * 60 * 60 * 24))

    /* RENDER ------------------------------ */
    return (
        <>
        <div className="warn-box">
        <FontAwesomeIcon className="warn" icon={faExclamation}/>
        <p>It has been {days} days since form creation</p>
        </div>
        </>
    )
}

export default Warning
