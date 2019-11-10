import React, { useState } from 'react';
import TextInput from '../controls/TextInput';
import Button from '../controls/Button';
import { performRowAddition } from '../rowoperations/AdditionAndScaleOperations';

/**
 * Stores and renders controls for row addition operation
 */
function FcontainerTop( { rowRangeTest, getMatrix, setMatrix, dimRows }) {
    const [R1Scalar, setR1Scalar] = useState(1); // amount to scale row by
    const [R1, setR1] = useState(''); // first row used in operation
    const [R2, setR2] = useState(''); // second row used in operation

    // test scalar values, which may be fractional or negative
    const inputDecimalTest = (val) => {
        // scalars should not be made up for more than 7 characters
        const maxLength = 7;

        // 0 or 1 dash followed by optional digits and 0 or 1 dot
        // then optional digits 
        const RE = /^-{0,1}\d*\.{0,1}\d*$/;
        return !RE.test(val) || val.length > maxLength;
    }

    const inputRowTest = (row) => {
        // selected row must be less than or equal to N
        const flagOne = rowRangeTest(row);

        row = Number(row);
        // cannot perform a row action on itself
        const flagTwo = (row === R1) || (row === R2);
        return flagOne || flagTwo;
    }

    // call the perform row addition function in the row operations module
    const callperformRowAddition = () => {
        performRowAddition(R1, R2, R1Scalar, getMatrix, setMatrix, dimRows)
    }

    return (
        <div className='fContainer'>
            <TextInput className='fInput' f={setR1Scalar} val={R1Scalar}
                inputTest={inputDecimalTest} number={false}
                testId={'scalarValueTop'} />
            <div className='fDiv'> 🞄 Row </div>
            <TextInput className='fInput' f={setR1} val={R1}
                inputTest={inputRowTest} number={true}
                testId={'R1ValueTop'} placeholder={'Rᵢ'} />
                
            <div className='fDiv'> &#43; Row </div>
            <TextInput className='fInput' f={setR2} val={R2}
                inputTest={inputRowTest} number={true}
                testId={'R2ValueTop'} placeholder={'Rⱼ'} />
            <Button className='fButton'
                name={`${R1Scalar} 🞄 R${R1} + R${R2} → R${R2}`} f={callperformRowAddition}
                testId={"rowAdditionButton"} />
        </div>
    )
}

export default FcontainerTop;