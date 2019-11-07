import React from 'react';
import Cell from './Cell';

function Matrix(props) {
    const gridStyle = { gridTemplateColumns: `repeat(${props.cols}, 1fr)` };

    // render each cell of the matrix using dimensions 
    // passed in props
    const renderCells = (arr) => {
        let count = 0;
        return (
            arr.map(el => {
                return <Cell i={count++} key={count}
                    matrix={props.matrix} setMatrix={props.setMatrix} />
            })
        );
    };

    return (
        <div className="matrix" style={gridStyle}>
            {renderCells(props.matrix)}
        </div>
    );
}

export default Matrix;