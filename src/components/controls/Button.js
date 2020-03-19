import React from 'react';

function Button({ className, name, testId, f }) {
    return (
        <button className={className} onClick={(e) => f()}
            data-testid={testId} >
            {name}
        </button>);
}

export default Button;