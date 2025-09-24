// imports
import { useState } from 'react'
import { Graph, DefaultLink, DefaultNode } from '@visx/network';
import './SigTree.css'
import SigNode from './SigNode.jsx'
import SigLink from './SigLink.jsx'

function SigTree(props) {

    // save signatures in meaningful var
    const sigs = props.data;

    // init vars for nodes
    const nodes = [];
    let x = 0;
    let y = 0;

    // go through each signature and create a node
    sigs.map(sig => {
        const node = {
            x:x,
            y:y,
            data: sig
        }
        // move next node to below
        y += 100
        nodes.push(node) // add to list
    })

    const links = [];

    for (let i = 0; i < nodes.length - 1; i++) {
        links.push({source: nodes[i], target: nodes[i+1]})
    }


//     const links = [

//     { source: nodes[0], target: nodes[1] },
//     { source: nodes[1], target: nodes[2] },
// ];


    const graph = {
        nodes, links
    }


    const goNode = (node) => {

        return <SigNode key={node.node.data} data={node.node.data}/>
    } 

    const goLink = (link) => {
        return <SigLink source={link.link.source} dest={link.link.target}/>
    }

        // nodeComponent={(node: {x, y, data}) => <SigNode key={data} data={data}/>} 
    return (
        <>
        <svg>
        <Graph graph={graph} top={100} left={500} linkComponent={goLink} 
        nodeComponent={goNode} 
        />
        </svg>
        {/*sigs.map(sig => {
            return <div>
                <SigNode key={sig} data={sig}/>

            </div>
        })*/}
        </>
    )
}

export default SigTree
