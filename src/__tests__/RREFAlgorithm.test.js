import convertMatrix from '../components/rowelimination/RREFAlgorithm';

let matrix1 = [[1, 2, -1, -4], [2, 3, -1, -11], [-2, 0, -3, 22]];
let matrix2 = [[1, 3, 1, 9], [1, 1, -1, 1], [3, 11, 5, 35]];
let matrix3 = [[2, 1, -1, 8], [-3, -1, 2, -11], [-2, 1, 2, - 3]];
let matrix4 = [[1, 3, 2, 5, 11], [-1, 2, -2, 5, -6], [2, 6, 4, 7, 19], [0, 5, 2, 6, 5]];
let matrix5 = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

let expected1 = [[1, 0, 0, -8], [0, 1, 0, 1], [0, 0, 1, -2]];
let expected2 = [[1, 0, -2, -3], [-0, 1, 1, 4], [0, 0, 0, 0]];
let expected3 = [[1, 0, 0, 2], [0, 1, 0, 3], [0, 0, 1, -1]];
let expected4 = [[1, 0, 0, 0, 5], [0, 1, 0, 0, -1], [0, 0, 1, 0, 2], [0, 0, 0, 1, 1]];
let expected5 = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

let compareArrays = (arr1, arr2) => {
    let m = arr1.length;
    let n = arr1[0].length;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            let flag = arr1[i][j] === arr2[i][j];

            if (!flag) {
                return false;
            }
        }
    }
    return true;
}

test('The first array is in reduced row echelon form', () => {
    let res = convertMatrix(matrix1);
    let flag = compareArrays(res, expected1);

    expect(flag).toBe(true);
});

test('The second array is in reduced row echelon form', () => {
    let res = convertMatrix(matrix2);
    let flag = compareArrays(res, expected2);

    expect(flag).toBe(true);
});

test('The third array is in reduced row echelon form', () => {
    let res = convertMatrix(matrix3);
    let flag = compareArrays(res, expected3);

    expect(flag).toBe(true);
});

test('The fourth array is in reduced row echelon form', () => {
    let res = convertMatrix(matrix4);
    let flag = compareArrays(res, expected4);

    expect(flag).toBe(true);
});

test('The zero matrix is unchanged', () => {
    let res = convertMatrix(matrix5);
    let flag = compareArrays(res, expected5);

    expect(flag).toBe(true);
});
