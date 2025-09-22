import { useState } from 'react'
import './SigTree.css'
import SigNode from './SigNode.jsx'


function SigTree(props) {

    const sigs = props.data;

    return (
        <>
        {sigs.map(sig => {
            return <div>
                <SigNode key={sig} data={sig}/>

            </div>
        })}
        </>
    )
}

export default SigTree
