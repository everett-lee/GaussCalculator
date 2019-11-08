import React, { useState } from 'react';
import Matrix from './Matrix';
import SwapButton from './controls/SwapButton';
import FunctionContainer from './functioncontainer/FunctionContainer';
import TopContainer from './TopContainer';

function App() {
  const zeroMatrix = new Array(25).fill(0);
  const startDimensions = { n: 5, m: 5 };
  const [dimensions, setDimensions] = useState(startDimensions);
  const [n, setN] = useState('');
  const [m, setM] = useState('');
  const [matrix, setMatrix] = useState(zeroMatrix);
  const [swapPair, setSwapPair] = useState([]);

  const makeArray = () => {
    if (n === '' || m === '') {
      resetMatrix()
      return;
    }

    const size = n * m;
    setDimensions({ n, m });
    setMatrix(new Array(size).fill(0));
  }

  const resetMatrix = () => {
    setN('');
    setM('');
    setDimensions(startDimensions);
    setMatrix(zeroMatrix);
  }

  // swap two rows in the matrix
  const doSwap = (i) => {
    let pair = swapPair;
    pair.push(i);
    setSwapPair(pair.slice(0));

    // if two rows have been selected to swap
    if (swapPair.length === 2) {
      // indexes of rows being swapped
      let first = swapPair[0];
      let second = swapPair[1];

      let arr = arrayToMatrix();

      // the row being overwritten
      let temp = arr[first];
      arr[first] = arr[second];
      arr[second] = temp;

      let flattened = arr.flatMap(el => el);
      setMatrix(flattened);
      setSwapPair([])
    }
  }

  // converts the matrix which is currently in array form to
  // an array of arrays
  const arrayToMatrix = () => {
    const out = [];
    const cols = dimensions.m;
    // iterate in chunks of the column size
    for (let i = 0; i < matrix.length; i = i + cols) {
      out.push(matrix.slice(i, i + cols));
    }
    return out;
  }

  const renderSwapButtons = () => {
    let count = 0;
    // there should be as many buttons as rows
    const arr = new Array(dimensions.n).fill(0);

    return arr.map(el => {
      return <SwapButton i={count++} key={count} name={`⟺ Row ${count}`}
        f={doSwap} />
    })
  }

  return (
    <div className='mainContainer'>
      <TopContainer setN={setN} setM={setM} makeArray={makeArray}
                    n={n} m={m} resetMatrix={resetMatrix}/>
      <div className='matrixContainer'>
        <div className='swapButtons'>
          {renderSwapButtons()}
        </div>
        <Matrix cols={dimensions.m} matrix={matrix} setMatrix={setMatrix} />
      </div>
      <div className='bottomContainer'>
        <FunctionContainer rows={dimensions.n} getMatrix={arrayToMatrix}
                            setMatrix={setMatrix} />
        <button className='bottomButton' />
        <button className='bottomButton' />
      </div>
    </div>
  );
}

export default App;
