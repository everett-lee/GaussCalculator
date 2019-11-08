import React, { useState } from 'react';

function Cell(props) {
    // // the final column (the constants) should have a different colour
    // const styleCell = (i) =>  {
    //     // the index of the item mod |columns| is |columns|-1 
    //     const cellColour = (i % props.cols) === props.cols-1? '#96f2ff': 'white';
    //     return { backgroundColor: cellColour }
    // }   

    const [style, setStyle] = useState({ backgroundColor: 'white' });

    const sleep = (time) => {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    //update the matrix state
    const updateState = (val) =>  {
        let matrixCopy = props.matrix.slice(0);
        matrixCopy[props.index] = val;
        props.setMatrix(matrixCopy)
    }

    const updateVal = (val) => {
        // 0 or 1 dash followed by optional digits and 0 or 1 dot
        // then optional digits 
        let RE = /^-{0,1}\d*\.{0,1}\d*$/;
        if (!RE.test(val)) {
            // flash red to indicate invalid input
            setStyle({ backgroundColor: '#ec3643' });
            // return to white
            sleep(100).then(x => setStyle(props.style));
        } else {
            updateState(val)
        }
    }

    return (
        <div className='cell'>
            <input className='numInput' 
            value={props.matrix[props.index]} 
            style={style}
            onChange={(e) => updateVal(e.target.value)} 
            data-testid={props.index} />
    </div>);
}

export default Cell;