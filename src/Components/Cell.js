import React, { useState } from 'react';

function Cell(props) {
    const [style, setStyle] = useState({ backgroundColor: 'white' });

    const sleep = (time) => {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    //update the matrix state
    const updateState = (val) =>  {
        let matrixCopy = props.matrix.slice(0);
        matrixCopy[props.i] = val;
        props.setMatrix(matrixCopy)
    }

    const updateVal = (val) => {
        // 0 or 1 dash followed by optional digits and 0 or 1 dot
        // then optional digits 
        let RE = /^-{0,1}\d*\.{0,1}\d*$/;
        if (!RE.test(val)) {
            setStyle({ backgroundColor: '#ec3643' });
            sleep(500).then(x => setStyle({ backgroundColor: 'white' }));
        } else {
            updateState(val)
        }
    }

    return (<div className="cell">
        <input className="numInput" value={props.matrix[props.i]} style={style}
            onChange={(e) => updateVal(e.target.value)} />
    </div>);
}

export default Cell;