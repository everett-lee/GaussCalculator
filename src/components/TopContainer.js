import React from 'react';
import TextInput from './controls/TextInput';
import Button from './controls/Button';

function TopContainer({ m, setM, n, setN, makeArray, resetMatrix }) {
  // test input for dimensions. m,n must be between 1 and 10.
  const topInputTest = (val) => {
    return (isNaN(val) || val < 1 || val > 10);
  };

  return (
    <div className='topContainer'>
      <TextInput className='topInput' val={m} inputTest={topInputTest}
        f={setM} placeholder={'m'} number={true} testId={"mInput"} />
      <div className='topDiv'>X</div>
      <TextInput className='topInput' val={n} inputTest={topInputTest}
        f={setN} placeholder={'n'} number={true} testId={"nInput"} />
      <Button name='Make matrix' f={makeArray} className={'topButton'} />
      <Button name='Reset' f={resetMatrix} className={'topButton'} />
    </div>
  );
}

export default TopContainer;