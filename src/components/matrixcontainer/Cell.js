import React from 'react';
import  { convertToString } from '../utils/ArithmeticUtils';

/**
 * A cell in the matrix. Is used to input and display values
 */
function Cell({ cols, index, opacity, matrix, setMatrix }) {
    const maxValLength = 10;

    const getColour = (i) => {
        // the index of the item mod |columns| is |columns|-1 
        const cellColour = (i % cols) === cols - 1 ? '#cecece' : 'white';

        return cellColour;
    }

    const style = {
        opacity: opacity,
        transitionProperty: "opacity",
        transitionDuration: "0.2s",
        backgroundColor: getColour(index)
    };

    //update the matrix state
    const updateState = (val) => {
        let matrixCopy = matrix.slice(0);
        matrixCopy[index] = val;
        setMatrix(matrixCopy);
    }

    const updateVal = (val) => {
        if (val.length > maxValLength) {
            return;
        }

        // Return if max fractional part added
        const decimalPlace = val.indexOf('.');
        if (val.slice(decimalPlace).length > 3) {
            return;
        }

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
                value={convertToString(matrix[index])}
                style={style}
                onChange={(e) => updateVal(e.target.value)}
                data-testid={index} />
        </div>
    );
}

export default Cell;