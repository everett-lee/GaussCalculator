// swap two rows in the matrix
const doSwap = (i, swapPair, setSwapPair, arrayToMatrix, setMatrix, dimRows) => {
    let pair = swapPair;
    pair.push(i);
    setSwapPair(pair.slice(0));

    // if two rows have been selected to swap
    if (swapPair.length === 2) {
        // indexes of rows being swapped
        let first = swapPair[0];
        let second = swapPair[1];

        dimRows([first, second]);

        let arr = arrayToMatrix();

        // the row being overwritten
        let temp = arr[first];
        arr[first] = arr[second];
        arr[second] = temp;

        let flattened = arr.flatMap(el => el);
        setMatrix(flattened);
        setSwapPair([]);
    }
};

export default doSwap;