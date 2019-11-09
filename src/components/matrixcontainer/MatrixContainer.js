import React from 'react';
import Matrix from './Matrix';
import SwapButton from '../controls/SwapButton';
import doSwap from'../rowoperations/SwapOperation';

/**
 * Renders the matrix and side buttons
 */
function MatrixContainer(props) {
    
    // call the swap row operation to swap two selected
    // rows
    const callDoSwap = (i) => {
        doSwap(i, props.swapPair, props.setSwapPair, 
            props.arrayToMatrix, props.setMatrix);
    }

    const renderSwapButtons = () => {
        let count = 0;
        // there should be as many buttons as rows
        const arr = new Array(props.dimensions.m).fill(0);

        return arr.map(el => {
            let i = count;
            count++;

            let clicked = false;
            // if this button has been clicked
            if (i === props.swapPair[0] || i === props.swapPair[1]) {
                clicked = true;
            }

            return <SwapButton i={i} key={count} name={`⟺ Row ${count}`}
                f={callDoSwap} clicked={clicked} />
        })
    }

    return (
        <div className='matrixContainer'>
            <div className='swapButtons'>
                {renderSwapButtons()}
            </div>
            <Matrix cols={props.dimensions.n}
                matrix={props.matrix}
                setMatrix={props.setMatrix} />
        </div>
    );
}

export default MatrixContainer;