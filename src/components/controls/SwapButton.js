import React from 'react';

function SwapButton({ clicked, f, i, name }) {
    let style = {};
    if (clicked) {
        style = { backgroundColor: '#3CBC8D' }
    }

    return (
        <button className="swapButton" onClick={(e) => { f(i) }}
            style={style}>
            {name}
        </button>
    );
}

export default SwapButton;