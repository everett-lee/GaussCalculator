import React from 'react';

/**
 * A cell in the matrix. Is used to input and display values
 */
function Cell(props) {
    const getColour = (i) => {
        // the index of the item mod |columns| is |columns|-1 
        const cellColour = (i % props.cols) === props.cols - 1 ? '#cecece' : 'white';
        
        return cellColour;
    }

    const style = { opacity: props.opacity, 
                    transitionProperty: "opacity",
                    transitionDuration: "0.2s",
                    backgroundColor: getColour(props.index)};

    //update the matrix state
    const updateState = (val) => {
        let matrixCopy = props.matrix.slice(0);
        matrixCopy[props.index] = val;
        props.setMatrix(matrixCopy);
    }

    const updateVal = (val) => {
        // 0 or 1 dash followed by optional digits and 0 or 1 dot
        // then optional digits 
        let RE = /^-{0,1}\d*\.{0,1}\d*$/;
        if (!RE.test(val)) {
            // return on invalid input 
            return;
        } else {
            updateState(val);
        }
    }

    return (
        <div className='cell' >
            <input type='text' className='numInput'
                value={props.matrix[props.index]}
                style={style}
                onChange={(e) => updateVal(e.target.value)}
                data-testid={props.index} />
        </div>
    );
}

export default Cell;