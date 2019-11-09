import React, { useState, createContext } from 'react';

/**
 *  Contains the history of states stored as a stack
 */
const HistoryContext = createContext();

function HistoryProvider({ children }) {
    const startDimensions = { n: 4, m: 5 };
    const zeroMatrix = new Array(startDimensions.m * startDimensions.n).fill(0);
    const startState = { matrix: zeroMatrix, dimensions: startDimensions }

    const [history, setHistory] = useState([startState]);

    // return the last saved state
    const undo = () => {

        if (history.length === 1) {
            return false;
        }

        const lastState = history.slice(0).pop();
        setHistory(history.slice(0, history.length-1));
 
        return lastState;
    }

    // add the current state to the history
    const addState = (matrix) => {
        const savedStates = history.slice(0);
        savedStates.push(matrix);
        setHistory(savedStates);
    }

    // set as empty history array
    const resetHistory = (zeroMatrix) => {
        setHistory([zeroMatrix]);
    }

    return (
        <HistoryContext.Provider value={{ undo, addState, resetHistory }}>
            {children}
        </ HistoryContext.Provider>
    );
}

export { HistoryProvider, HistoryContext };

