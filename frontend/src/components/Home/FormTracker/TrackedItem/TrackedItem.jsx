import { useState, useContext } from 'react'
import './TrackedItem.css'
import {Link} from 'react-router'

function TrackedItem(props) {


    return (
        <>
            <div className="trackedForm">

                <div className="form-info">
                    <h3 className='trackerHeader'>{props.data.name}</h3>
                    <p>Date Created: {props.data.creationDate}</p>
                </div>

                <div className="signatures">
                {props.data.signatures.map((sign) => {

                    if (sign.isSigned === "signed"){
                        return <span className="signedCheck"></span> 

                    }else if (sign.isSigned === "unsigned"){
                        return <span className="unsignedCheck"></span> 
                        
                    }else if (sign.isSigned === "rejected"){
                        return <span className="rejectedCheck"></span> 
                        
                    }else {
                        return <span className="naCheck"></span> 

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
