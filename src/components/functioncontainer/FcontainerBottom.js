import React, { useState } from 'react';
import TextInput from '../controls/TextInput';
import Button from '../controls/Button';
import { performRowScale } from '../rowoperations/AdditionAndScaleOperations';

/**
 *  renders control for row scale operation
 */
function FcontainerBottom(props) {
    const [R1Scale, setR1Scale] = useState(1); // amount to scale row by
    const [R1, setR1] = useState(''); // row used in operation
    const [operation, setOperation] = useState('🞄') // multiply or divide

    // switch between division and multiplication
    const switchOperation = () => {
        const op = operation === '🞄' ? '÷' : '🞄';
        setOperation(op);
    }

    // test scalar values, which may be fractional or negative
    const inputDecimalTest = (val) => {
        // scalars should not be made up for more than 7 characters
        const maxLength = 7;

        // scaling by 0 is not allowed
        const zeroFlag = val === '0';

        // 0 or 1 dash followed by optional digits and 0 or 1 dot
        // then optional digits 
        const RE = /^-{0,1}\d*\.{0,1}\d*$/;
        return !RE.test(val) || val.length > maxLength || zeroFlag;
    }

    // call perform row scale function from row operations module
    const callperformRowScale = () => {
        performRowScale(R1, R1Scale, operation, props.getMatrix, props.setMatrix);
    }

    return (
        <div className="fContainer">
            <div className="fDivLong"> </div>
            <div className="fDiv"> Row </div>
            <TextInput className='fInput' f={setR1} val={R1}
                inputTest={props.rowRangeTest} number={true}
                testId={'R1ValueBottom'}
                placeholder={'Rᵢ'} />
            <div className="opButtonContainer">
                <Button className='opButton'
                    name={operation}
                    testId={"setOperationButton"}
                    f={switchOperation} />
            </div>
            <TextInput className='fInput' f={setR1Scale} val={R1Scale}
                inputTest={inputDecimalTest} number={false}
                testId={'scalarValueBottom'} />
            <Button className='fButton'
                name={`R${R1} ${operation} ${R1Scale} → R${R1}`}
                testId={"rowScaleButton"}
                f={callperformRowScale} />
        </div>
    );
}

export default FcontainerBottom;