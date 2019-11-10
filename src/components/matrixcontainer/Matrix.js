import React from 'react';
import Cell from './Cell';

/**
 * The matrix of cells 
 */
function Matrix({ cols, dimmedCells, matrix, setMatrix }) {
    const gridStyle = { gridTemplateColumns: `repeat(${cols}, minmax(auto, 1fr))` };

    // render each cell of the matrix using dimensions 
    // passed in props
    const renderCells = (arr) => {
        let count = 0;
        return (
            arr.map(el => {
                let i = count;
                count++;

                let opacity = dimmedCells.includes(i)? 0: 1;

                return <Cell index={i} key={i} matrix={matrix} 
                        setMatrix={setMatrix} cols={cols}
                        opacity={opacity} />
            })
        );
    };

    return (
        <div className="matrix" style={gridStyle}>
            {renderCells(matrix)}
        </div>
    );
}

export default Matrix;