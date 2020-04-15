import  { copyMatrix, plus, divide, multiply } from '../utils/ArithmeticUtils';
/**
 * Contains logic for the row addition and row scale operations
 */


// read a scalar value into a variable or 
// return false if not a number
const parseScalar = (scalar) => {
    // attempt to parse the scalar value 
    let parsedScalar = parseFloat(scalar);
    // invalid scalar provided
    if (isNaN(parsedScalar)) {
        console.error('Invalid scalar');
        return false;
    }
    return parsedScalar;
};

// test row id which must be >= 1 and <= m
const rowRangeTest = (row, m) => {
    return (isNaN(row) || row < 1 || row > m);
};

// adds a scaled R1 to R2 and updates matrix state
const performRowAddition = (R1, R2, R1Scalar, getMatrix, setMatrix, dimRows) => {
    let m = getMatrix().length;

    // invalid rows selected
    if (rowRangeTest(R1, m) || rowRangeTest(R2, m)) {
        console.error('Both rows must be selected');
        return;
    }

    let R1index = R1 - 1; // rows are zero-indexed
    let R2index = R2 - 1;

    // attempt to parse the scalar value 
    let parsedScalar = parseScalar(R1Scalar);
    if (!parsedScalar) {
        // return if an invalid scalar was provided
        return;
    }

    // get copy of the matrix and cast it to Bignumber
    const numericMatrix = copyMatrix(getMatrix());

    // scale R1 by the required amount
    const scaledR1 = numericMatrix[R1index].map(el => multiply(el, parsedScalar));
    // add scaled R1 to R2
    for (let i = 0; i < numericMatrix[R2index].length; i++) {
        const currentVal = numericMatrix[R2index][i];
        numericMatrix[R2index][i] = plus(currentVal, scaledR1[i]);
    }

    // flatten result and update parent class 
    const flatMatrix = numericMatrix.flatMap(el => el);

    dimRows([R2index]);
    setMatrix(flatMatrix);
};

// multiplies/divides R by some value
const performRowScale = (R1, R1Scale, operation, getMatrix, setMatrix, dimRows) => {
    const multiplySymbol = '\u00B7';

    let R1index = R1 - 1; // rows are zero-indexed in the code
    if (R1index < 0) {
        return;
    }

    // attempt to parse the scalar value 
    let parsedScalar = parseScalar(R1Scale);
    if (!parsedScalar) {
        // return if an invalid scalar was provided
        return;
    }

    // get copy of the matrix and cast it to Bignumber
    const numericMatrix = copyMatrix(getMatrix());

    // scale R1 by the required amount
    const scaledR1 = numericMatrix[R1index].map(el => {
        if (operation === multiplySymbol) {
            return multiply(el, parsedScalar);
        } else {
            return divide(el, parsedScalar);
        }
    });

    numericMatrix[R1index] = scaledR1;

    // flatten result and update parent class 
    const flatMatrix = numericMatrix.flatMap(el => el);

    dimRows([R1index]);
    setMatrix(flatMatrix);
};

export { performRowAddition, performRowScale };