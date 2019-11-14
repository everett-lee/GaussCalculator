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
        return (
            arr.map( (el, index)=> {

                let opacity = dimmedCells.includes(index)? 0: 1;

                return <Cell index={index} key={index} matrix={matrix} 
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