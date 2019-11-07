import React, { useState } from 'react';
import Matrix from './Matrix';
import TextInput from './controls/TextInput';
import TopButton from './controls/TopButton';
import SwapButton from './controls/SwapButton';

function App() {
  const zeroMatrix = [0, 0, 0, 0, 0, 0];
  const startDimensions = { n: 3, m: 2 };
  const [dimensions, setDimensions] = useState(startDimensions);
  const [n, setN] = useState('');
  const [m, setM] = useState('');
  const [matrix, setMatrix] = useState([0, 0, 0, 0, 0, 0]);
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

  const doSwap = (i) => {
    let pair = swapPair;
    pair.push(i);
    setSwapPair(pair);

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

  const swapButtons = () => {
    // there should be as many buttons as rows
    let count = 0;
    const arr = new Array(dimensions.n).fill(0);
    return arr.map(el => {
      return <SwapButton i={count++} key={count} name={`⟺ Row ${count}`}
        f={doSwap} />
    })
  }


  // converts the matrix which is currently in array for to
  // an array of arrays
  const arrayToMatrix = () => {
    const out = [];
    const cols = dimensions.m;
    // iterate in chunks of the column size
    for (let i = 0; i < matrix.length; i = i + cols) {
      out.push(matrix.slice(i, i + cols));
      console.log(matrix.slice(i, i + cols));
    }
    
    return out;
  }

  return (
    <div className="mainContainer">
      <div className="topContainer">
        <TextInput className="topInput" val={n}
          f={setN} />
        <div className="topDiv"></div>
        <TextInput className="topInput" val={m}
          f={setM} />
        <TopButton name='Make matrix' f={makeArray} />
        <TopButton name='Reset' f={resetMatrix} />
      </div>
      <div className="matrixContainer">
        <div className="swapButtons">
          {swapButtons()}
        </div>
        <Matrix cols={dimensions.m} matrix={matrix} setMatrix={setMatrix} />
      </div>
    </div>
  );
}

export default App;
