import React from 'react'
import FunctionContainer from './functioncontainer/FunctionContainer';
import Button from './controls/Button';

function BottomContainer(props) {

    return (
        <div className='bottomContainer'>
        <FunctionContainer rows={props.rows} 
        getMatrix={props.getMatrix}
        setMatrix={props.setMatrix} />  
        <Button name={'↺'} className={'undoButton'} f={props.undoLast}
                testId={"undoButton"} />
        <Button name={'Reduced echeleon form'} className={'echeleonButton'}/>
      </div>
    );
}

export default BottomContainer;