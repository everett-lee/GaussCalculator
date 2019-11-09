import React, { useState, useContext } from 'react';
import TopContainer from './TopContainer';
import BottomContainer from './BottomContainer';
import { HistoryContext } from './providers/HistoryProvider';
import MatrixContainer from './matrixcontainer/MatrixContainer';
import TopRow from './toprow/TopRow';

function App() {
  const zeroMatrix = new Array(25).fill(0);
  const startDimensions = { m: 5, n: 5 };

  const historyContext = useContext(HistoryContext); // stores history of past states

  const [dimensions, setDimensions] = useState(startDimensions); // dimension of array (mXn)
  const [m, setM] = useState('');
  const [n, setN] = useState('');
  const [matrix, setMatrix] = useState(zeroMatrix); // the matrix represented as a 1D array
  const [swapPair, setSwapPair] = useState([]); // two rows to be swapped

  const makeArray = () => {
    resetMatrix()
    if (m === '' || n === '') {
      return;
    }

    const size = m * n;
    setDimensions({ m, n });

    const matrix = new Array(size).fill(0);
    updateMatrixState(matrix)
  }

  // reset matrix to original dimensions and values
  const resetMatrix = () => {
    setN('');
    setM('');
    setDimensions(startDimensions);
    setMatrix(zeroMatrix)
    setSwapPair([]);
    historyContext.resetHistory({ matrix: zeroMatrix, dimensions: startDimensions });
  }

  // gets previous state from history
  // and update current state to reflect it
  const undoLast = () => {
    const last = historyContext.undo();

    // history is empty
    if (!last) {
      resetMatrix();
    } else {
      setMatrix(last.matrix);
      setDimensions(last.dimensions);
    }
  }

  // update matrix state and save
  // to history
  const updateMatrixState = (newMatrix) => {
    historyContext.addState({ matrix, dimensions });
    setMatrix(newMatrix)
  }

  // converts the matrix, which is currently in array form, to
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

  return (
    <div className='mainContainer'>
      <TopContainer setM={setM} setN={setN} makeArray={makeArray}
        m={m} n={n} resetMatrix={resetMatrix} />
      <TopRow cols={dimensions.n}/>
      <MatrixContainer m={dimensions.m} n={dimensions.n} swapPair={swapPair}
                       setSwapPair={setSwapPair} arrayToMatrix={arrayToMatrix}
                       matrix={matrix} setMatrix={updateMatrixState} />
      <BottomContainer rows={dimensions.m}
        getMatrix={arrayToMatrix}
        setMatrix={updateMatrixState}
        undoLast={undoLast} />
    </div>
  );
}

export default App;
