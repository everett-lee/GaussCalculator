import React from 'react';
import FcontainerTop from './FcontainerTop';
import FcontainerBottom from './FcontainerBottom';

/**
 * Renders both child components of the bottom
 * container 
 */
function FunctionContainer({ rows, getMatrix, setMatrix, dimRows }) {

  // Test row id which must be >= 1 and <= m
  const rowRangeTest = (row) => {
    return (isNaN(row) || row < 1 || row > rows);
  }

  return (
    <div className='functionContainer'>
      <FcontainerTop rows={rows}
        dimRows={dimRows}
        getMatrix={getMatrix}
        setMatrix={setMatrix}
        rowRangeTest={rowRangeTest} />
      <FcontainerBottom rows={rows}
        dimRows={dimRows}
        getMatrix={getMatrix}
        setMatrix={setMatrix}
        rowRangeTest={rowRangeTest} />
    </div>
  );
}

export default FunctionContainer;