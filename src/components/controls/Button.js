import React from 'react';

function Button(props) {
    return ( 
    <button className={props.className} onClick={(e) => props.f()} 
            data-testid={props.testId} >
        {props.name}
    </button> );
}

export default Button;