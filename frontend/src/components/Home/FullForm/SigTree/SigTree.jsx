import { useState } from 'react'
import './SigTree.css'

function SigTree(props) {

    const sigs = props.data


    return (
        <>
        {sigs.map(sig => {
            return <div>
                <p>sig.isSigned</p>

            </div>
        })}
        </>
    )
}

export default SigTree
