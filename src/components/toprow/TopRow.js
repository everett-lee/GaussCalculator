import React from 'react';
import TopRowItem from './TopRowItem';

function TopRow(props) {
    const rowHeads = ['x₁', 'x₂', 'x₃', 'x₄', 'x₅', 'x₆', 'x₇', 'x₈', 'x₉', 'd'];

    const makeColHeaders = () => {
        const emptyArray = new Array(props.cols).fill(0);
        let i = 0;
        let headingsEnd = rowHeads.length -1 ;

        return (
            emptyArray.map(el => {
                // if this is the final column heading it is a constant and should use 'd'
                let heading = i === props.cols-1? rowHeads[headingsEnd]: rowHeads[i];
                i++;
            
                return (
                    <TopRowItem heading={heading} key={i}/>
                );
            }
            )
        );
    }

    return (
        <div className='topRow'>{makeColHeaders()}</div>
    );
}

export default TopRow;