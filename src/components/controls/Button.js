import React from 'react';

function TopButton(props) {
    return ( 
    <button className={props.className} onClick={(e) => props.f()} 
            data-testid={props.testId} >
        {props.name}
    </button> );
}

export default TopButton;