import React from 'react'
import FunctionContainer from './functioncontainer/FunctionContainer';
import Button from './controls/Button';
import convertMatrix from './rowelimination/RREFAlgorithm';

function BottomContainer(props) {
    // convert the matrix to reduced row echelon form
    const callConvertMatrix = () => {
      // get the converted matrix, which must be flattened
      const convertedMatrix = convertMatrix(props.getMatrix());
      props.setMatrix(convertedMatrix.flatMap(el => el));
    }

    return (
        <div className='bottomContainer'>
        <FunctionContainer rows={props.rows} 
        getMatrix={props.getMatrix}
        setMatrix={props.setMatrix} />  
        <Button name={'↺'} className={'undoButton'} f={props.undoLast}
                testId={"undoButton"} />
        <Button name={'Convert to row canonical form'} className={'echeleonButton'}
                f={callConvertMatrix}/>
      </div>
    );
}

export default BottomContainer;