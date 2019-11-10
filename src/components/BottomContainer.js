import React from 'react'
import FunctionContainer from './functioncontainer/FunctionContainer';
import Button from './controls/Button';
import convertMatrix from './rowelimination/RREFAlgorithm';

function BottomContainer({ rows, getMatrix, setMatrix, undoLast, dimRows }) {
  // convert the matrix to reduced row echelon form
  const callConvertMatrix = async () => {
    // get the converted matrix, which must be flattened
    convertMatrix(getMatrix(), dimRows, setMatrix).then(res => {
      setMatrix(res.flatMap(el => el));
    });
  }

  return (
    <div className='bottomContainer'>
      <FunctionContainer rows={rows} dimRows={dimRows}
        getMatrix={getMatrix}
        setMatrix={setMatrix} />
      <Button name={'↺'} className={'undoButton'} f={undoLast}
        testId={"undoButton"} />
      <Button name={'Convert to row canonical form'} className={'echeleonButton'}
        f={callConvertMatrix} />
    </div>
  );
}

export default BottomContainer;