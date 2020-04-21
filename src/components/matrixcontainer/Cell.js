import React from 'react';
import { checkFraction } from '../utils/StringToFractionUtil';

/**
 * A cell in the matrix. Is used to input and display values
 */
const GREY = '#cecece';
const WHITE = 'white';
function Cell({ cols, index, opacity, matrix, setMatrix }) {

    // Cells in the last row are grey
    const getColour = (i) => {
        // The index of the item mod |columns| is |columns|-1 
        const cellColour = (i % cols) === cols - 1 ? GREY : WHITE;

        return cellColour;
    }

    const style = {
        opacity: opacity,
        transitionProperty: "opacity",
        transitionDuration: "0.2s",
        backgroundColor: getColour(index)
    };

    // Update the matrix state
    const updateState = (val) => {
        if (!checkFraction(val) && val !== '') {
            return;
        }

        let matrixCopy = matrix.slice(0);

        matrixCopy[index] = val;
        setMatrix(matrixCopy);
    }

    return (
        <div className='cell' >
            <input type='text' className='numInput'
                value={matrix[index].toString()}
                style={style}
                onChange={(e) => updateState(e.target.value)}
                data-testid={index} />
        </div>
    );
}

export default Cell;