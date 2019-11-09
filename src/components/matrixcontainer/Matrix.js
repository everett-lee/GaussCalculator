import React from 'react';
import Cell from './Cell';

/**
 * The matrix of cells 
 */
function Matrix(props) {
    const gridStyle = { gridTemplateColumns: `repeat(${props.cols}, minmax(auto, 1fr))` };

    // render each cell of the matrix using dimensions 
    // passed in props
    const renderCells = (arr) => {
        let count = 0;
        return (
            arr.map(el => {
                let i = count;
                count++;

                return <Cell index={i} key={i} matrix={props.matrix} 
                        setMatrix={props.setMatrix} cols={props.cols} />
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