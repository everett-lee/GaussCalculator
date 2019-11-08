import React, { useState } from 'react';
import TextInput from '../controls/TextInput';
import Button from '../controls/Button';

function FcontainerTop(props) {
    const [R1Scale, setR1Scale] = useState(1); // amount to scale row by
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
        const flagOne = props.rowRangeTest(row);

        row = Number(row);
        // cannot perform a row action on itself
        const flagTwo = (row === R1) || (row === R2);
        return flagOne || flagTwo;
    }

    // adds a scaled R1 to R2 and updates matrix state
    const performRowAddition = () => {
        // invalid rows selected
        if (props.rowRangeTest(R1) || props.rowRangeTest(R2)) {
            console.error("Both rows must be selected")
            return;
        }

        let R1index = R1 - 1; // rows are zero-indexed
        let R2index = R2 - 1;

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
        const scaledR1 = matrix[R1index].map(el => el *= parsedScalar)
        // add scaled R1 to R2
        for (let i = 0; i < matrix[R2index].length; i++) {
            matrix[R2index][i] += scaledR1[i];
        }

        // flatten result and update parent class 
        const flatMatrix = matrix.flatMap(el => el);
        props.setMatrix(flatMatrix);
    }

    return (
        <div className='fContainer'>
            <TextInput className='fInput' f={setR1Scale} val={R1Scale}
                inputTest={inputDecimalTest} number={false}
                testId={'scalarValueTop'} />
            <div className='fDiv'> 🞄 R </div>
            <TextInput className='fInput' f={setR1} val={R1}
                inputTest={inputRowTest} number={true}
                testId={'R1ValueTop'} />
            <div className='fDiv'> &#43; R </div>
            <TextInput className='fInput' f={setR2} val={R2}
                inputTest={inputRowTest} number={true}
                testId={'R2ValueTop'} />
            <Button className='fButton'
                name={`${R1Scale} 🞄 R${R1} + R${R2} → R${R2}`} f={performRowAddition}
                testId={"rowAdditionButton"} />
        </div>
    )
}

export default FcontainerTop;