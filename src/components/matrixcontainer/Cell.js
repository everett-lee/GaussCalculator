import React from 'react';

// 0 or 1 dash followed by optional digits and 0 or 1 slash
// then optional digits 
const RE = /^-{0,1}\d*\/{0,1}\d*$/;

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

        if (!RE.test(val)) {
            // return on invalid input 
            return;
        } else {
            // check for 0 denominator
            const splitFraction = val.split('/');
            if (splitFraction.length > 1 && splitFraction[1] === '0') {
                return;
            }

            updateState(val);
        }
    }

    return (
        <div className='cell' >
            <input type='text' className='numInput'
                value={matrix[index].toString()}
                style={style}
                onChange={(e) => updateVal(e.target.value)}
                data-testid={index} />
        </div>
    );
}

export default Cell;