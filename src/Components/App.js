import React, { useState } from 'react';
import Matrix from './Matrix';
import SwapButtons from './SwapButtons';
import TextInput from './controls/TextInput';
import Button from './controls/Button';

function App() {
  const zeroMatrix = [0, 0, 0, 0, 0, 0];
  const startDimensions = { n: 3, m: 2 };
  const [dimensions, setDimensions] = useState(startDimensions)
  const [n, setN] = useState('')
  const [m, setM] = useState('')
  const [matrix, setMatrix] = useState([0, 0, 0, 0, 0, 0])

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

  return (
    <div className="mainContainer">
      <div className="topContainer">
        <TextInput className="topInput" val={n}
          f={setN} />
        <div className="topDiv"></div>
        <TextInput className="topInput" val={m}
          f={setM} />
        <Button className="topButton" name='Make matrix' f={makeArray} />
        <Button className="topButton" name='Reset' f={resetMatrix} />
      </div>
      <div className="matrixContainer">
        <SwapButtons />
        <Matrix cols={dimensions.m} matrix={matrix} setMatrix={setMatrix} />
      </div>
    </div>
  );
}

export default App;
