import BigNumber from 'bignumber.js';

BigNumber.config({ DECIMAL_PLACES: 3 })

// copy a matrix and its items
function copyMatrix(matrix) {
    return matrix.map(row => {
        return row.map(val => castIfNumeric(val))
    })
}

function castIfNumeric(val) {
    // allowed by RegEx
    if (val === '-' || val === '.') {
        return new BigNumber(0, 10);
    }

    return new BigNumber(val, 10);
}

function plus(a, b) {
    if (!(a instanceof BigNumber)) {
        a = new BigNumber(a, 10);
    }

    if (!(b instanceof BigNumber)) {
        b = new BigNumber(b, 10);
    }

    return a.plus(b);
}

function minus(a, b) {
    if (!(a instanceof BigNumber)) {
        a = new BigNumber(a, 10);
    }

    if (!(b instanceof BigNumber)) {
        b = new BigNumber(b, 10);
    }

    return a.minus(b);
}

function multiply(a, b) {
    if (!(a instanceof BigNumber)) {
        a = new BigNumber(a, 10);
    }

    if (!(b instanceof BigNumber)) {
        b = new BigNumber(b, 10);
    }

    return a.multipliedBy(b);
}

function divide(a, b) {
    if (!(a instanceof BigNumber)) {
        a = new BigNumber(a, 10);
    }

    if (!(b instanceof BigNumber)) {
        b = new BigNumber(b, 10);
    }

    return a.dividedBy(b);
}


function convertToString(a) {
    if (!(a instanceof BigNumber)) {
        a = new BigNumber(a, 10);
    }

    return a.toString(10);
}


export { copyMatrix, convertToString, plus, minus, divide, multiply };
