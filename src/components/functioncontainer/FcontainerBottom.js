import React, { useState } from 'react';
import TextInput from '../controls/TextInput';
import Button from '../controls/Button';

function FcontainerBottom(props) {
    const [R1Scale, setR1Scale] = useState(1); // amount to scale row by
    const [R1, setR1] = useState(''); // row used in operation
    const [operation, setOperation] = useState('🞄')

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

    // multiplies/divides R by some value
    const performRowScale = () => {
        let R1index = R1 - 1; // rows are zero-indexed in the code

        // attempt to parse the scalar value 
        let parsedScalar = props.parseScalar(R1Scale);
        if (!parsedScalar) {
            // return if an invlid scalar was provided
            return;
        }

        // get copy of matrix from the app class
        let matrix = props.getMatrix();
        matrix = props.convertToNumeric(matrix);

        // scale R1 by the required amount
        const scaledR1 = matrix[R1index].map( el => {
            if (operation === '🞄') {
                return el *= parsedScalar;
            } else {
                return el /= parsedScalar;
            }
        });

        matrix[R1index] = scaledR1;

        // flatten result and update parent class 
        const flatMatrix = matrix.flatMap(el => el);
        props.setMatrix(flatMatrix);
    }

    return (
        <div className="fContainer">
            <TextInput className='fInput' f={setR1Scale} val={R1Scale}
                inputTest={inputDecimalTest} number={false}
                testId={'scalarValueBottom'} />
            <div className="opButtonContainer">
                <Button className='fButton'
                    name={operation}
                    testId={"setOperationButton"}
                    f={switchOperation} />
            </div>
            <div className="fDivLong"> R </div>
            <TextInput className='fInput' f={setR1} val={R1}
                inputTest={props.rowRangeTest} number={true}
                testId={'R1ValueBottom'} />
            <Button className='fButton'
                name={`R${R1} ${operation} ${R1Scale} → R${R1}`}
                testId={"rowScaleButton"} 
                f={performRowScale} />
        </div>
    );
}

export default FcontainerBottom;