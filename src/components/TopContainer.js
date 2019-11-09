import React from 'react';
import TextInput from './controls/TextInput';
import Button from './controls/Button';

function TopContainer(props) {
  // test input for dimensions. m,n must be between 1 and 10.
  const topInputTest = (val) => {
    return (isNaN(val) || val < 1 || val > 10);
  }

  return (
    <div className='topContainer'>
      <TextInput className='topInput' val={props.m} inputTest={topInputTest}
        f={props.setM} placeholder={'m'} number={true} />
      <div className='topDiv'>X</div>
      <TextInput className='topInput' val={props.n} inputTest={topInputTest}
        f={props.setN} placeholder={'n'} number={true} />
      <Button name='Make matrix' f={props.makeArray} className={'topButton'} />
      <Button name='Reset' f={props.resetMatrix} className={'topButton'} />
    </div>
  );
}

export default TopContainer;