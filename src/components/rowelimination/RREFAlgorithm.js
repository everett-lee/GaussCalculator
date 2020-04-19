import { copyMatrix, toFractionalString, equals, minus, divide, multiply } from '../utils/ArithmeticUtils';
import sleep from '../utils/Sleep';
import BigNumber from 'bignumber.js';

/**
 * Algorithm to convert input matrix to reduced row echelon form. Based on
 * pseudocode from https://rosettacode.org/wiki/Reduced_row_echelon_form
 */
const zero = new BigNumber(0, 10);

const nullFunction = () => { return }
async function convertMatrix(matrix, dimRows, setMatrix = nullFunction) {
    // Get a copy of the matrix in BigNumber form
    let numericMatrix = copyMatrix(matrix);

    let lead = 0; // pivot entry

    const rowCount = numericMatrix.length;
    const colCount = numericMatrix[0].length;

    for (let r = 0; r < rowCount; r++) {
        // lead exceeds bounds of nested array
        if (lead >= colCount) {
            return mapNumericMatrixToStringForm(numericMatrix);
        }
        let i = r;

        // when leading cell in this row is a zero
        if (equals(numericMatrix[i][lead], zero)) {
            let res = dealWithZeroLead(numericMatrix, i, r, lead, rowCount, colCount);
            // exceeded bounds of matrix
            if (res[0] === -1) {
                return mapNumericMatrixToStringForm(numericMatrix);;
            } else {
                [i, lead] = [...res];
            }
        }
        numericMatrix = swapRows(i, r, numericMatrix);

        await dimAnimation(dimRows, [i, r], 500);
        setMatrix(mapNumericMatrixToStringForm(numericMatrix));

        let leadingVal = numericMatrix[r][lead];

        if (!equals(leadingVal, zero)) {
            // divide row r by this value
            numericMatrix[r] = numericMatrix[r].map(el => divide(el, leadingVal));

            await dimAnimation(dimRows, [r], 500);
            setMatrix(mapNumericMatrixToStringForm(numericMatrix));
        }

        for (let i = 0; i < rowCount; i++) {
            leadingVal = numericMatrix[i][lead];
            if (i !== r) {
                let scaledR = numericMatrix[r].map(el => multiply(el, leadingVal));

                let rowI = numericMatrix[i];
                // subtract the scaled row r from row i 
                for (let j = 0; j < colCount; j++) {
                    rowI[j] = minus(rowI[j], scaledR[j]);

                    setMatrix(mapNumericMatrixToStringForm(numericMatrix));
                }


            }
            await dimAnimation(dimRows, [i], 250);
        }
        lead++;
    }
    return mapNumericMatrixToStringForm(numericMatrix);
}

// performs dimming animations
async function dimAnimation(dimRows, rows, time) {
    dimRows(rows);
    await sleep(time);
}

function dealWithZeroLead(matrix, i, r, lead, rowCount, colCount) {
    while (equals(matrix[i][lead], zero)) {
        i++;

        // i has exceeded bounds of matrix
        if (i === rowCount) {
            i = r;
            lead++;

            // leading col has exceeded bounds of
            // nested matrix 
            if (lead === colCount) {
                // signals termination condition
                return [-1, -1];
            }
        }
    }
    return [i, lead];
}

function swapRows(i, r, matrix) {
    matrix = copyMatrix(matrix); // create copy

    let temp = matrix[i];
    matrix[i] = matrix[r];
    matrix[r] = temp;

    return matrix;
}

function mapNumericMatrixToStringForm(numericMatrix) {
    return numericMatrix.flatMap(row => row.map(el => toFractionalString(el)))
}

export default convertMatrix;