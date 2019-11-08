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
        let R1index = R1 - 1; // rows are zero-indexed in the code
        let R2index = R2 - 1;

        // get copy of matrix from the app class
        let matrix = props.getMatrix();

        // scale R1 by the required amount
        const scaledR1 = matrix[R1index].map( el => el *= R1Scale)
        // add scaled R1 to R2
        for (let i = 0; i < matrix[R2index].length; i++) {
            matrix[R2index][i] += scaledR1[i];
        }
        
        // flatten result and update parent class 
        const flatMatrix = matrix.flatMap( el => el);
        props.setMatrix(flatMatrix);

    }

    return (
        <div className='fContainer'>
            <TextInput className='fInput' f={setR1Scale} val={R1Scale}
                inputTest={inputDecimalTest} number={false} />
            <div className='fDiv'> &times; R </div>
            <TextInput className='fInput' f={setR1} val={R1}
                inputTest={inputRowTest} number={true} />
            <div className='fDiv'> R </div>
            <TextInput className='fInput' f={setR2} val={R2}
                inputTest={inputRowTest} number={true} />
            <Button className='fButton'
             name={`${R1Scale} 🞄 R${R1} + R${R2} → R${R2}`} f={performRowAddition}/>
        </div>
    )
}

export default Fcontainer;