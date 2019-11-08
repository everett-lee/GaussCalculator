import React, { useState } from 'react';
import TextInput from '../controls/TextInput';
import Button from '../controls/Button';

function Fcontainer(props) {
    const [R1Scale, setR1Scale] = useState(1); // amount to scale row by
    const [R1, setR1] = useState(''); // first row used in operation
    const [R2, setR2] = useState(''); // second row used in operation

    // test scalar values, which may be fractional or negative
    const inputDecimalTest = (val) => {
        // 0 or 1 dash followed by optional digits and 0 or 1 dot
        // then optional digits 
        const RE = /^-{0,1}\d*\.{0,1}\d*$/;
        return !RE.test(val);
    }

    // test row id which must be >= 1 and <= N
    const rowRangeTest = (row) => {
        return (isNaN(row) || row < 1 || row > props.rows);
    }

    const inputRowTest = (row) => {
        // selected row must be less than or equal to N
        const flagOne = rowRangeTest(row);

        row = Number(row);
        // cannot perform a row action on itself
        const flagTwo = (row === R1) || (row === R2);
        return flagOne || flagTwo;
    }

    // adds a scaled R1 to R2 and updates matrix state
    const performRowAddition = () => {
        // invalid rows selected
        if (rowRangeTest(R1) || rowRangeTest(R2)) {
            console.error("Both rows must be selected")
            return;
        }

        let R1index = R1 - 1; // rows are zero-indexed in the code
        let R2index = R2 - 1;

        // attempt to parse the scalar value 
        let parsedScalar = parseFloat(R1Scale);
        // invalid scalar provided
        if (isNaN(parsedScalar)) {
            console.error("Invalid scalar")
            return;
        }

        // get copy of matrix from the app class
        let matrix = props.getMatrix();
        matrix = convertToNumeric(matrix);

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

    // covert all cell values to numbers
    const convertToNumeric = (array) => {
        const out = []

        // convert to base 10 decimal
        array.forEach(row => out.push(row.map(el => parseFloat(el, 10))));
        return out;
    }

    return (
        <div className='fContainer'>
            <TextInput className='fInput' f={setR1Scale} val={R1Scale}
                inputTest={inputDecimalTest} number={false} />
            <div className='fDiv'> &times; R </div>
            <TextInput className='fInput' f={setR1} val={R1}
                inputTest={inputRowTest} number={true} />
            <div className='fDiv'> &#43; R </div>
            <TextInput className='fInput' f={setR2} val={R2}
                inputTest={inputRowTest} number={true} />
            <Button className='fButton'
                name={`${R1Scale} 🞄 R${R1} + R${R2} → R${R2}`} f={performRowAddition} />
        </div>
    )
}

export default Fcontainer;