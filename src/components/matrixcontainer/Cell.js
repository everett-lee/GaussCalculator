import React from 'react';
import sleep from '../utils/Sleep';

function Cell(props) {
    const getColour = (i) => {
        // the index of the item mod |columns| is |columns|-1 
        const cellColour = (i % props.cols) === props.cols - 1 ? '#cecece' : 'white';
        
        return { backgroundColor: cellColour }
    }

    //update the matrix state
    const updateState = (val) => {
        let matrixCopy = props.matrix.slice(0);
        matrixCopy[props.index] = val;
        props.setMatrix(matrixCopy)
    }

    const updateVal = (val) => {
        // 0 or 1 dash followed by optional digits and 0 or 1 dot
        // then optional digits 
        let RE = /^-{0,1}\d*\.{0,1}\d*$/;
        if (!RE.test(val)) {
            return;
            // // flash red to indicate invalid input
            // setStyle({ backgroundColor: '#ec3643' });
            // // return to white
            // sleep(100).then(x => setStyle(props.style));
        } else {
            updateState(val)
        }
    }

    return (
        <div className='cell'>
            <input type='text' className='numInput'
                value={props.matrix[props.index]}
                style={getColour(props.index)}
                onChange={(e) => updateVal(e.target.value)}
                data-testid={props.index} />
        </div>
    );
}

export default Cell;