import React from 'react';

function TopButton(props) {
    return ( 
    <button className="topButton" onClick={(e) => props.f()} >
        {props.name}
    </button> );
}

export default TopButton;