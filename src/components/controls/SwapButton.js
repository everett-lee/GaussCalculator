import React from 'react';

function SwapButton(props) {
    let style = {};
    if (props.clicked) {
        style = {backgroundColor: '#3CBC8D'}
    }

    return ( 
    <button className="swapButton" onClick={(e) => {props.f(props.i)}} 
        style={style}>
        {props.name}
    </button>
    );
}

export default SwapButton;