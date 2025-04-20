import { useState, useContext } from 'react'
import './TrackedItem.css'
import {Link} from 'react-router'
import ShowSig from './ShowSig/ShowSig.jsx'

function TrackedItem(props) {


    return (
        <>
            <div className="trackedForm">

                <div className="form-info">
                    <h3 className='trackerHeader'>{props.data.formType.name}</h3>
                    <p>Date Created: {props.data.creationDate}</p>
                </div>

                <div className="signatures">
                {props.data.signatures.map((sign) => {
                    if (sign.isSigned === "signed"){
                        return <div className='sig-circle'>
                                <span className="signedCheck"></span>
                                <ShowSig data={sign} status="Signed"/>
                                </div> 

                    }else if (sign.isSigned === "unsigned"){
                        return <div className='sig-circle'>
                                    <span className="unsignedCheck"></span> 
                                    <ShowSig data={sign} status="Not signed"/>
                                </div>
                    }else if (sign.isSigned === "rejected"){
                        return <div className='sig-circle'>
                                    <span className="rejectedCheck"></span> 
                                    <ShowSig data={sign} status="Rejected"/>
                                </div>
                    }else {
                        return <div className='sig-circle'>
                                    <span className="naCheck"></span> 
                                    <ShowSig data={sign} status="N/A"/>
                                </div>
                    }

                })}
                </div>

                {/*Here is where the exclamation mark thingy should go
                    Maybe we use some type of time comparison function
                    as well as if you are a user who hasn't signed*/}

                <Link to="/home">More Details</Link>
            </div>
        </>
    )
}

export default TrackedItem
