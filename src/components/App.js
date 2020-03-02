import React, { useState, useContext } from 'react';
import TopContainer from './TopContainer';
import BottomContainer from './BottomContainer';
import { HistoryContext } from './providers/HistoryProvider';
import MatrixContainer from './matrixcontainer/MatrixContainer';
import TopRow from './toprow/TopRow';
import sleep from './utils/Sleep';

function App() {
  const startDimensions = { m: 4, n: 5 };
  const zeroMatrix = new Array(startDimensions.m * startDimensions.n).fill(0);

  // create an array with random values as start state
  const makeRandomArray = () => {
    const min = -10;
    const max = 10;

    const size = startDimensions.m * startDimensions.n;
    const arr = new Array(size).fill(0);

    // map each 0 element to a random member in range min to max
    return arr.map(el => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    });
  }

  const historyContext = useContext(HistoryContext); // stores history of past states

  const [dimensions, setDimensions] = useState(startDimensions); // dimension of array (mXn)
  const [m, setM] = useState('');
  const [n, setN] = useState('');
  const [matrix, setMatrix] = useState(makeRandomArray()); // the matrix represented as a 1D array
  const [swapPair, setSwapPair] = useState([]); // two rows to be swapped
  const [dimmedCells, setDimmedCells] = useState([]); // cells dimmed during transition animations

  // create an array of the required dimensions
  const makeArray = () => {
    resetMatrix();
    if (m === '' || n === '') {
      return;
    }

    const size = m * n;
    setDimensions({ m, n });

    const matrix = new Array(size).fill(0);
    historyContext.resetHistory({ matrix: zeroMatrix, dimensions: startDimensions });
    updateMatrixState(matrix);
  }

  // reset matrix to original dimensions and values
  const resetMatrix = () => {
    setN('');
    setM('');
    setDimensions(startDimensions);
    setMatrix(zeroMatrix);
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
    setMatrix(newMatrix);
  }

  // converts the matrix, which is currently in 1D array form, to
  // 2D array
  const arrayToMatrix = () => {
    const out = [];
    const cols = dimensions.n;
    // iterate in chunks of the column size
    for (let i = 0; i < matrix.length; i = i + cols) {
      out.push(matrix.slice(i, i + cols));
    }
    return out;
  }

  // triggers transition animation to signify row operation. Takes an array of 
  // row indices as its sole argument
  const dimRows = async (rows) => {
    const cols = dimensions.n;
    const out = [];

    rows.forEach(row => {
      let startIndex = row * cols;
      out.push(startIndex);

      // add index of ther cells in this row
      for (let i = startIndex + 1; i < startIndex + cols; i++) {
        out.push(i);
      }
    });

    // add these to array of dimmed cells
    setDimmedCells(out);
    await sleep(250);
    setDimmedCells([]);
  }

  return (
    <div className='mainContainer'>
      <TopContainer setM={setM} setN={setN}
        m={m} n={n}
        makeArray={makeArray}
        resetMatrix={resetMatrix} />
      <TopRow cols={dimensions.n} />
      <MatrixContainer dimensions={dimensions}
        swapPair={swapPair}
        setSwapPair={setSwapPair}
        arrayToMatrix={arrayToMatrix}
        matrix={matrix}
        setMatrix={updateMatrixState}
        dimmedCells={dimmedCells}
        dimRows={dimRows} />
      <BottomContainer rows={dimensions.m}
        getMatrix={arrayToMatrix}
        setMatrix={updateMatrixState}
        undoLast={undoLast}
        setDimmedCells={setDimmedCells}
        dimRows={dimRows} />
    </div>
  );
}

export default App;
