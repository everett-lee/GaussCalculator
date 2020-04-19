// 0 or 1 dash followed by optional digits and 0 or 1 slash
// then optional digits 
const RE = /^-{0,1}\d*\/{0,1}\d*$/;
const maxValLength = 10;

/**
 * Checks that an input String can be 
 * parsed as a fraction
 * 
 * @param {String} val 
 * @param {Number} maxLength 
 */
const checkFraction = (val, maxLength=maxValLength) => {
    // Empty values are parsed as 0
    if (!val) {
        return val;
    }

    if (val.length > maxLength) {
        return false;
    }

    if (!RE.test(val)) {
        // return on invalid input 
        return false;
    } else {
        // check for 0 denominator
        const splitFraction = val.split('/');
        if (splitFraction.length > 1 && splitFraction[1] === '0') {
            return false;
        }

        return val;
    }
}

export { checkFraction };