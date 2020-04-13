import React from 'react';

/**
 * A cell in the matrix. Is used to input and display values
 */
function Cell({ cols, index, opacity, matrix, setMatrix }) {
    const maxValLength = 18;

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
        if (val.slice(decimalPlace).length > 5) {
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

    // The (string represented) number ends with a decimal or zero, 
    // so must not be cast and rounded
    const isUnfinished = val => (typeof val === "string" && val.slice(-1) === '.')
        || (typeof val === "string" && val.slice(-1) === '0');

    const displayValue = (val) => {
        if (isNaN(val) || isUnfinished(val)) {
            return val;
        }
        // If it's a number, round to four decimal places
        return Math.round((Number(val) + Number.EPSILON) * 10000) / 10000;
    }

    return (
        <div className='cell' >
            <input type='text' className='numInput'
                value={displayValue(matrix[index])}
                style={style}
                onChange={(e) => updateVal(e.target.value)}
                data-testid={index} />
        </div>
    );
}

export default Cell;