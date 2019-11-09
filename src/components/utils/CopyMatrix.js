// copy a matrix and its items
function copyMatrix(matrix) {
    const copyMatrix = []
    matrix.forEach(el => {
        copyMatrix.push(el.slice(0));        
    });

    return copyMatrix;
}

export default copyMatrix;
