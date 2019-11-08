import React from 'react';
import FcontainerTop from './FcontainerTop';
import FcontainerBottom from './FcontainerBottom';

/**
 * contains both child components of the bottom
 * container 
 */
function FunctionContainer(props) {
  // covert all cell values to numbers
  const convertToNumeric = (array) => {
    const out = []

    // convert to base 10 decimal
    array.forEach(row => out.push(row.map(el => {
      // convert single dots and dashes (allowed by regex) to 0
      el === '.' || el === '-' ? el = 0 : el = el;
      return parseFloat(el, 10)
    }
    )));
    return out;
  }

  // read a scalar value into a variable or 
  // return false if not a number
  const parseScalar = (scalar) => {
    // attempt to parse the scalar value 
    let parsedScalar = parseFloat(scalar);
    // invalid scalar provided
    if (isNaN(parsedScalar)) {
      console.error("Invalid scalar")
      return false;
    }
    return parsedScalar;
  }

  // test row id which must be >= 1 and <= N
  const rowRangeTest = (row) => {
    return (isNaN(row) || row < 1 || row > props.rows);
  }

  return (
    <div className='functionContainer'>
      <FcontainerTop rows={props.rows}
        getMatrix={props.getMatrix}
        setMatrix={props.setMatrix}
        convertToNumeric={convertToNumeric}
        rowRangeTest={rowRangeTest}
        parseScalar={parseScalar} />
      <FcontainerBottom rows={props.rows}
        getMatrix={props.getMatrix}
        setMatrix={props.setMatrix}
        convertToNumeric={convertToNumeric}
        rowRangeTest={rowRangeTest}
        parseScalar={parseScalar} />
    </div>
  );
}

export default FunctionContainer;