import copyMatrix from '../utils/CopyMatrix';

/**
 * Algorithm to convert input matrix to reduced row echelon form. Sourced
 * from https://rosettacode.org/wiki/Reduced_row_echelon_form
 */
 function convert(matrix) {
    matrix = copyMatrix(matrix); // create copy

    let lead = 0; // pivot entry

    const rowCount = matrix.length
    const colCount = matrix[0].length
    
    for (let r = 0; r < rowCount; r++) {
        // lead exceeds bounds of nested array
        if (lead >= colCount) {
            return matrix;
        }

    }

    }
 }

