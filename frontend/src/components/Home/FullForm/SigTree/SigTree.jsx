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
    const windth = 0.8 * window.innerWidth;
    let x = windth/2;
    let y = 30;

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

    // THIS IS HARD CODED, NEED TO FIND LOGIC BASED SOLUTION
    const links = [];
    if (nodes.length === 4) {
        for (let i = 1; i < nodes.length; i++) {
            if (i === 1) {
                nodes[i].x = nodes[i].x-100
                links.push({source: nodes[i-1], target: nodes[i]})
                // nodes[i].x = -100
                // links.push({source: nodes[i], target: nodes[i+1]})

            } else if (i===2) {
                nodes[i].x = nodes[i].x + 100
                nodes[i].y -= 100
                links.push({source: nodes[0], target: nodes[i]})

            } else if (i===3) {
                nodes[i].x = nodes[i].x + 100
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

    // create the graph
    const graph = {nodes, links}

    // function to return a SigNode with appropriate data
    const goNode = (node) => {

        return <SigNode key={node.data} data={node}/>
    } 

    // function to return a SigLink with appropriate data
    const goLink = (link) => {
        return <SigLink source={link.source} dest={link.target}/>
    }
    console.log(links.length)

      

    /* RENDER-------------------------------------*/
    return (
        <>
        <svg width={windth} className="graph">
            <g>
                {links.map(link => {
                    return goLink(link)
                })}
                {nodes.map(node => {
                    return goNode(node)
                })}
            </g>
        </svg>
        </>
    )
}

export default SigTree
