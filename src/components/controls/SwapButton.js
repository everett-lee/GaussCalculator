import React from 'react';

function SwapButton(props) {

    return ( 
    <button className="swapButton" onClick={(e) => {props.f(props.i)}} >
        {props.name} 
    </button> );
}

export default SwapButton;