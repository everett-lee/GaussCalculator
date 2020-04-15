import BigNumber from 'bignumber.js';

// copy a matrix and its items
function copyMatrix(matrix) {
    return matrix.map(row => {
        return row.map(val => castIfNumeric(val))
    })
}

function castIfNumeric(val) {
    // allowed by RegEx
    if (val === '-' || val === '.' || !!val) {
        return new BigNumber(0, 10);
    }

    return new BigNumber(val, 10);
}

function equals(a, b) {
    if (!(a instanceof BigNumber)) {
        a = new BigNumber(a, 10);
    }

    if (!(b instanceof BigNumber)) {
        b = new BigNumber(b, 10);
    }
    
    return a.isEqualTo(b);
}

function plus(a, b) {
    if (!(a instanceof BigNumber)) {
        a = new BigNumber(a, 10);
    }

    if (!(b instanceof BigNumber)) {
        b = new BigNumber(b, 10);
    }

    const res = a.plus(b);
    return zeroIfBelowMin(res);
}

function minus(a, b) {
    if (!(a instanceof BigNumber)) {
        a = new BigNumber(a, 10);
    }

    if (!(b instanceof BigNumber)) {
        b = new BigNumber(b, 10);
    }

    const res = a.minus(b);
    return zeroIfBelowMin(res);
}

function multiply(a, b) {
    if (!(a instanceof BigNumber)) {
        a = new BigNumber(a, 10);
    }

    if (!(b instanceof BigNumber)) {
        b = new BigNumber(b, 10);
    }

    const res = a.multipliedBy(b);
    return zeroIfBelowMin(res);
}

function divide(a, b) {
    if (!(a instanceof BigNumber)) {
        a = new BigNumber(a, 10);
    }

    if (!(b instanceof BigNumber)) {
        b = new BigNumber(b, 10);
    }

    const res = a.dividedBy(b);
    return zeroIfBelowMin(res);
}

function zeroIfBelowMin(num) {
    const absoluteValueNum = num.abs();
    if (absoluteValueNum.isLessThan(new BigNumber(0.00002, 10))) {
        return new BigNumber(0);
    }
    return num;
}

function convertToString(a) {
    if (!(a instanceof BigNumber)) {
        a = new BigNumber(a, 10);
    }

    if (a.isInteger()) {
        return a.toString();
    }

    const fraction = a.toFraction(100000);
    const numerator = fraction[0].toString();
    const denominator = fraction[1].toString();

    return `${numerator} / ${denominator}`;
}


export { copyMatrix, convertToString, equals, plus, minus, divide, multiply };
