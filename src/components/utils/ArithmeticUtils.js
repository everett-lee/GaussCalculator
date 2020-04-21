import BigNumber from 'bignumber.js';

// Copy a matrix and its items
function copyMatrix(matrix) {
    return matrix.map(row => {
        return row.map(val => toBigNumber(val))
    });
}

function toBigNumber(val, defaultOutput=0) {
    if (val instanceof BigNumber) {
        return val;
    }

    const stringVal = val.toString();

    // Integer value
    if (stringVal && stringVal.indexOf('/') === -1 && stringVal !== '-') {
        return new BigNumber(stringVal, 10);
    }

    if (!stringVal || stringVal === '-' || stringVal === '/' || isPartiallyComplete(stringVal)) {
        return new BigNumber(defaultOutput, 10);
    }

    const splitFraction = stringVal.split('/');
    const numerator = new BigNumber(splitFraction[0], 10);
    const denominator = new BigNumber(splitFraction[1], 10);

    const result = divide(numerator, denominator);
    return zeroIfBelowMin(result);
}

// A fraction with only one side assigned
function isPartiallyComplete(value) {
    const splitString = value.split('/');
    if (!!splitString[0] && !!splitString[1]) return false;
    return true;
}

function equals(a, b) {
    return a.isEqualTo(b);
}

function plus(a, b) {
    const res = a.plus(b);
    return zeroIfBelowMin(res);
}

function minus(a, b) {
    const res = a.minus(b);
    return zeroIfBelowMin(res);
}

function multiply(a, b) {
    const res = a.multipliedBy(b);
    return zeroIfBelowMin(res);
}

function divide(a, b) {
    const res = a.dividedBy(b);
    return zeroIfBelowMin(res);
}

function greaterThan(a, b) {
    return a.isGreaterThan(b);
}

function zeroIfBelowMin(num) {
    const absoluteValueNum = num.abs();
    if (absoluteValueNum.isLessThan(new BigNumber(0.00002, 10))) {
        return new BigNumber(0, 10);
    }
    return num;
}

function toFractionalString(a) {
    if (!(a instanceof BigNumber)) {
        a = new BigNumber(a, 10);
    }

    if (a.isInteger()) {
        return a.toString();
    }

    const fraction = a.toFraction(100000);
    const numerator = fraction[0].toString();
    const denominator = fraction[1].toString();

    if (denominator === '1') {
        return numerator;
    }

    return `${numerator}/${denominator}`;
}


export { copyMatrix, toFractionalString, toBigNumber, equals, plus, minus, divide, multiply, greaterThan };
