// imports
import { useState } from 'react'
import { Graph, DefaultLink, DefaultNode } from '@visx/network';
import './SigTree.css'
import SigNode from './SigNode.jsx'
import SigLink from './SigLink.jsx'
import SigSide from './SigSide.jsx'

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
    if (nodes.length === 4) {
        for (let i = 1; i < nodes.length; i++) {
            if (i === 1) {
                nodes[i].x = -100
                links.push({source: nodes[i-1], target: nodes[i]})
                // nodes[i].x = -100
                // links.push({source: nodes[i], target: nodes[i+1]})

            } else if (i===2) {
                nodes[i].x = 100
                nodes[i].y -= 100
                links.push({source: nodes[0], target: nodes[i]})

            } else if (i===3) {
                nodes[i].x = 100
                nodes[i].y -= 100
                links.push({source: nodes[i-1], target: nodes[i]})

            } else {
            }
        }
    } else {
        for (let i = 1; i < nodes.length; i++) {
            links.push({source: nodes[i-1], target: nodes[i]})
        }

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

    return (
        <>
        <svg className="graph">
            <Graph graph={graph} top={50} left={'translate(0, 50%)'} linkComponent={goLink} 
            nodeComponent={goNode}/>
        </svg>
        <SigSide/>
        </>
    )
}

export default SigTree
