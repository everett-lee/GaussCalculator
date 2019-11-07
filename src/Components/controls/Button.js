import React from 'react';

function Button(props) {
    return ( 
    <button className={props.className} onClick={(e) => props.f()} >
        {props.name}
    </button> );
}

export default Button;