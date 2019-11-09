/**
 * Contains logic for the row operations
 */

// covert all cell values to numbers
const convertToNumeric = (array) => {
    const out = []

    // convert to base 10 decimal
    array.forEach(row => out.push(row.map(el => {
        // convert single dots and dashes (allowed by regex) to 0
        el === '.' || el === '-' ? el = 0 : el = el;
        return parseFloat(el, 10)
    }
    )));
    return out;
}

// read a scalar value into a variable or 
// return false if not a number
const parseScalar = (scalar) => {
    // attempt to parse the scalar value 
    let parsedScalar = parseFloat(scalar);
    // invalid scalar provided
    if (isNaN(parsedScalar)) {
        console.error("Invalid scalar")
        return false;
    }
    return parsedScalar;
}

// test row id which must be >= 1 and <= m
const rowRangeTest = (row, m) => {
    return (isNaN(row) || row < 1 || row > m);
}

// adds a scaled R1 to R2 and updates matrix state
const performRowAddition = (R1, R2, R1Scalar, getMatrix, setMatrix) => {
    let m = getMatrix().length;

    // invalid rows selected
    if (rowRangeTest(R1, m) || rowRangeTest(R2, m)) {
        console.error("Both rows must be selected")
        return;
    }

    let R1index = R1 - 1; // rows are zero-indexed
    let R2index = R2 - 1;

    // attempt to parse the scalar value 
    let parsedScalar = parseScalar(R1Scalar);
    if (!parsedScalar) {
        // return if an invlid scalar was provided
        return;
    }

    // get copy of matrix from the app class
    let matrix = getMatrix();
    matrix = convertToNumeric(matrix);

    // scale R1 by the required amount
    const scaledR1 = matrix[R1index].map(el => el *= parsedScalar)
    // add scaled R1 to R2
    for (let i = 0; i < matrix[R2index].length; i++) {
        matrix[R2index][i] += scaledR1[i];
    }

    // flatten result and update parent class 
    const flatMatrix = matrix.flatMap(el => el);
    setMatrix(flatMatrix);
}


// multiplies/divides R by some value
const performRowScale = (R1, R1Scale, operation, getMatrix, setMatrix) => {
    let R1index = R1 - 1; // rows are zero-indexed in the code
    if (R1index < 0) {
        return;
    }

    // attempt to parse the scalar value 
    let parsedScalar = parseScalar(R1Scale);
    if (!parsedScalar) {
        // return if an invlid scalar was provided
        return;
    }

    // get copy of matrix from the app class
    let matrix = getMatrix();
    matrix = convertToNumeric(matrix);

    // scale R1 by the required amount
    const scaledR1 = matrix[R1index].map(el => {
        if (operation === '🞄') {
            return el *= parsedScalar;
        } else {
            return el /= parsedScalar;
        }
    });

    matrix[R1index] = scaledR1;

    // flatten result and update parent class 
    const flatMatrix = matrix.flatMap(el => el);
    setMatrix(flatMatrix);
}

export {performRowAddition, performRowScale}