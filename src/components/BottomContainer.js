import React from 'react'
import FunctionContainer from './functioncontainer/FunctionContainer';
import Button from './controls/Button';

function BottomContainer(props) {

    return (
        <div className='bottomContainer'>
        <FunctionContainer rows={props.rows} 
        getMatrix={props.getMatrix}
        setMatrix={props.setMatrix} />  
        <Button name={'↺'} className={'bottomButton'} f={props.undoLast}/>
        <Button name={'Reduced echleon form'} className={'bottomButton'}/>
      </div>
    );
}

export default BottomContainer;