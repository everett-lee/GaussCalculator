// Represents a number in String and numeric 
// forms
class NumberPair {
    constructor(string, number) {
        this.string = string;
        this.number = number;
    }

    toString() {
        // allowed by RegEx
        if (string === '-' || string === '.' || !!string) {
            return string;
        }

        if (a.isInteger()) {
            return a.toString();
        }

        const fraction = a.toFraction(100000);
        const numerator = fraction[0].toString();
        const denominator = fraction[1].toString();

        return `${numerator} / ${denominator}`;
    }

}