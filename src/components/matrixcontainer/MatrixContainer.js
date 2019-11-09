import React from 'react';
import Matrix from './Matrix';
import SwapButton from '../controls/SwapButton';

/**
 * Contains the matrix and side buttons. Also contains 
 * logic for the swap rows operation.
 */
function MatrixContainer(props) {
    // swap two rows in the matrix
    const doSwap = (i) => {
        let pair = props.swapPair;
        pair.push(i);
        props.setSwapPair(pair.slice(0));

        // if two rows have been selected to swap
        if (props.swapPair.length === 2) {
            // indexes of rows being swapped
            let first = props.swapPair[0];
            let second = props.swapPair[1];

            let arr = props.arrayToMatrix();

            // the row being overwritten
            let temp = arr[first];
            arr[first] = arr[second];
            arr[second] = temp;

            let flattened = arr.flatMap(el => el);
            props.setMatrix(flattened);
            props.setSwapPair([])
        }
    }


    const renderSwapButtons = () => {
        let count = 0;
        // there should be as many buttons as rows
        const arr = new Array(props.m).fill(0);

        return arr.map(el => {
            let i = count;
            count++;

            let clicked = false;
            // if this button has been clicked
            if (i === props.swapPair[0] || i === props.swapPair[1]) {
                clicked = true;
            }

            return <SwapButton i={i} key={count} name={`⟺ Row ${count}`}
                f={doSwap} clicked={clicked} />
        })
    }

    return (
        <div className='matrixContainer'>
            <div className='swapButtons'>
                {renderSwapButtons()}
            </div>
            <Matrix cols={props.n}
                matrix={props.matrix}
                setMatrix={props.setMatrix} />
        </div>
    );
}

export default MatrixContainer;