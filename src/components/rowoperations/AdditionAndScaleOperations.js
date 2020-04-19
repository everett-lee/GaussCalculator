import {
    copyMatrix, toFractionalString, toBigNumber, equals,
    plus, divide, multiply, greaterThan
} from '../utils/ArithmeticUtils';
import BigNumber from 'bignumber.js';
/**
 * Contains logic for the row addition and row scale operations
 */
const zero = new BigNumber(0, 10);
const maxNum = new BigNumber(1 * Math.pow(10, 15), 10);
const INVALID = "INVALID";

// parse Scalar value into BigNumber form
const parseScalar = (scalar, defaultValue) => {
    return toBigNumber(scalar, defaultValue);
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

    let R1index = R1 - 1; // rows are one-indexed
    let R2index = R2 - 1;

    // attempt to parse the scalar value, with default 
    // value of 0 otherwise
    let parsedScalar = parseScalar(R1Scalar, 0);
    if (!parsedScalar) {
        // return if an invalid scalar was provided
        return;
    }

    // get copy of the matrix and cast it to BigNumber
    const numericMatrix = copyMatrix(getMatrix());

    // scale R1 by the required amount
    const scaledR1 = numericMatrix[R1index].map(el => multiply(el, parsedScalar));
    // add scaled R1 to R2
    const addedR2 = numericMatrix[R2index].map((el, i) => {
        const scaledR1Value = scaledR1[i];
        const result = plus(el, scaledR1Value);
        return maxResultCheck(result);
    });

    if (!addedR2.includes(INVALID)) {
        numericMatrix[R2index] = addedR2;
        // return with no change if division resulted in 
        // value greater than maxNum
    } else {
        return;
    }

    // flatten result and update parent component 
    const flatMatrix = numericMatrix.flatMap(row => (row.map(el => toFractionalString(el))));

    dimRows([R2index]);
    setMatrix(flatMatrix);
};

// multiplies/divides R by some value
const performRowScale = (R1, R1Scale, operation, getMatrix, setMatrix, dimRows) => {
    const multiplySymbol = '\u00B7';

    let R1index = R1 - 1; // rows are one-indexed
    if (R1index < 0) {
        return;
    }

    // attempt to parse the scalar value, with default 
    // value of 1 otherwise
    let parsedScalar = parseScalar(R1Scale, 1);
    if (!parsedScalar) {
        // return if an invalid scalar was provided
        return;
    }

    if (equals(parsedScalar, zero)) {
        return;
    }

    // get copy of the matrix and cast it to BigNumber
    const numericMatrix = copyMatrix(getMatrix());

    // scale R1 by the required amount
    const scaledR1 = numericMatrix[R1index].map(el => {
        if (operation === multiplySymbol) {
            const result = multiply(el, parsedScalar);
            return maxResultCheck(zeroResultCheck(el, result));
        } else {
            const result = divide(el, parsedScalar);
            return maxResultCheck(zeroResultCheck(el, result));
        }
    });

    if (!scaledR1.includes(INVALID)) {
        numericMatrix[R1index] = scaledR1;
        // return with no change if division resulted in 
        // a value that is rounded to 0 or greater than 
        // maxNum
    } else {
        return;
    }

    // flatten result and cast to String 
    const flatMatrix = numericMatrix.flatMap(row => (row.map(el => toFractionalString(el))));

    dimRows([R1index]);
    setMatrix(flatMatrix);
};

const zeroResultCheck = (inNum, outNum) => {
    if (!equals(inNum, zero) && equals(outNum, zero)) {
        return INVALID;
    }
    return outNum;
}

const maxResultCheck = (inNum) => {
    if (inNum === INVALID || greaterThan(inNum, maxNum)) {
        return INVALID;
    }
    return inNum;
}

export { performRowAddition, performRowScale };