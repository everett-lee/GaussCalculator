import copyMatrix from '../utils/CopyMatrix';

/**
 * Algorithm to convert input matrix to reduced row echelon form. Based on
 * pseudocode from https://rosettacode.org/wiki/Reduced_row_echelon_form
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

        let i = r;

        // when leading cell in this row is a zero
        if (matrix[i][lead] === 0) {
            let res = dealWithZeroLead(matrix, i, rowCount, colCount);
            
            // exceeded bounds of matrix
            if (res[0] === - 1) {
                return matrix;
            } else {
                [i, lead] = [...res];
            }
        }

        return swapRows(i, r);
    }
 }

 function dealWithZeroLead(matrix, i, lead, rowCount, colCount) {
     while (matrix[i][lead] === 0) {
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

 function swapRows(i, r, matrix){
    matrix = copyMatrix(matrix); // create copy

    let temp = matrix[i];
    matrix[i] = matrix[r];
    matrix[r] = temp;

    return matrix;
 }
 
let matrix = [[1,2],[3,4]];
console.log(swapRows(matrix(0,1,matrix)))
console.log(matrix);