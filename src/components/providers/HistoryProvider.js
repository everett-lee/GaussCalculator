import React, { useState, createContext } from 'react';

/**
 *  Contains the history of actions stored as a stack
 */

const HistoryContext = createContext();

function HistoryProvider( {children} ) {
    const [history, setHistory] = useState([]);

    // return the last saved state
    const getLastState = () => {
        const lastState = history.pop();
        setHistory(history.slice(0));

        return lastState;
    }

    // add the current state to the history
    const addState = (matrix) => {
        const savedStates = history.slice(0);
        savedStates.push(matrix);
        setHistory(savedStates);
    }

    return (
        <HistoryContext.Provider value={{ getLastState, addState }}>
             { children }
        </ HistoryContext.Provider> 
        );
}

export { HistoryProvider, HistoryContext }

