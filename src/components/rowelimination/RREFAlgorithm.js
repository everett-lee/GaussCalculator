//import copyMatrix from '../utils/CopyMatrix';

const copyMatrix = require("../utils/CopyMatrix.js");


/**
 * Algorithm to convert input matrix to reduced row echelon form. Based on
 * pseudocode from https://rosettacode.org/wiki/Reduced_row_echelon_form
 */
 function convertMatrix(matrix) {
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
            let res = dealWithZeroLead(matrix, i, r, lead, rowCount, colCount);
            
            // exceeded bounds of matrix
            if (res[0] === - 1) {
                return matrix;
            } else {
                [i, lead] = [...res];
            }
        }
        matrix = swapRows(i, r, matrix);

        let leadingVal = matrix[r][lead];
        if (leadingVal !== 0) {
            // divide row r by this value
            matrix[r] = matrix[r].map( el => el / leadingVal);
        }

        for (let i = 0; i < rowCount; i++) {
            leadingVal = matrix[i][lead];
            if (i !== r) {
                let scaledR = matrix[r].map( el => el * leadingVal);

                let rowI = matrix[i];
                // subtract the scaled row r from row i 
                for (let j = 0; j < colCount; j++) {
                    rowI[j] -= scaledR[j];
                }
            }
        }
        lead++;
    }
    return matrix;
 }

 function dealWithZeroLead(matrix, i, r, lead, rowCount, colCount) {
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
 

let matrix1 = [[1,2,-1,-4],[2,3,-1,-11],[-2,0,-3,22]]
let matrix2 = [[1,3,1,9],[1,1,-1,1],[3,11,5,35]];
let res = convertMatrix(matrix2);

let expected2 = [[ 1, 0, -2, -3 ], [ -0, 1, 1, 4 ], [ 0, 0, 0, 0 ]];

console.log(res);