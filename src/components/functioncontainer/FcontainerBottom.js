import React, { useState } from 'react';
import TextInput from '../controls/TextInput';
import Button from '../controls/Button';
import { performRowScale } from '../rowoperations/AdditionAndScaleOperations';

const multiplySymbol = '\u00B7';
const divideSymbol = '\u00F7';

/**
 *  Renders control for row scale operation
 */
function FcontainerBottom( { getMatrix, setMatrix, rowRangeTest, dimRows} ) {
    const [R1Scale, setR1Scale] = useState(1); // Amount to scale row by
    const [R1, setR1] = useState(''); // Row used in operation
    const [operation, setOperation] = useState(multiplySymbol); // Multiply or divide

    // Switch between division and multiplication
    const switchOperation = () => {
        const op = operation === multiplySymbol ? divideSymbol : multiplySymbol;
        setOperation(op);
    };

    // Test scalar values, which may be fractional or negative
    const inputDecimalTest = (val) => {
        // Scalars should not be made up for more than 8 characters
        const maxLength = 8;

        // Scaling by 0 is not allowed
        const zeroFlag = val === '0' || parseFloat(val) === 0;

        // 0 or 1 dash followed by at least one digit and 0 or 1 slash
        // then optional digits
        const RE = /^-{0,1}\d*\/{0,1}[1-9]*$/;
        return !RE.test(val) || val.length > maxLength || zeroFlag;
    };

    // Call perform row scale function from row operations module
    const callPerformRowScale = () => {
        performRowScale(R1, R1Scale, operation, getMatrix, setMatrix, dimRows);
    };

    return (
        <div className="fContainer">
            <div className="fDivLong"> </div>
            <div className="fDiv"> Row </div>
            <TextInput className='fInput' f={setR1} val={R1}
                inputTest={rowRangeTest} number={true}
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
                f={callPerformRowScale} />
        </div>
    );
}

export default FcontainerBottom;