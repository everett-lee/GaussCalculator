import React from 'react';
import FcontainerTop from './FcontainerTop';
import FcontainerBottom from './FcontainerBottom';

/**
 * renders both child components of the bottom
 * container 
 */
function FunctionContainer(props) {

  // test row id which must be >= 1 and <= m
    const rowRangeTest = (row) => {
      return (isNaN(row) || row < 1 || row > props.rows);
  }

  return (
    <div className='functionContainer'>
      <FcontainerTop rows={props.rows}
        getMatrix={props.getMatrix}
        setMatrix={props.setMatrix} 
        rowRangeTest={rowRangeTest}/>
      <FcontainerBottom rows={props.rows}
        getMatrix={props.getMatrix}
        setMatrix={props.setMatrix}
        rowRangeTest={rowRangeTest} />
    </div>
  );
}

export default FunctionContainer;