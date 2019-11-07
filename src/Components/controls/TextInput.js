import React, { useState } from 'react';

function TextInput(props) {
    const [style, setStyle] = useState({ backgroundColor: 'white' });
    
    const sleep = (time) => {
        return new Promise((resolve) => setTimeout(resolve, time));
    }  

    const updateVal = (val) => {
        // show a red indicator if value is not valid
        if (isNaN(val) || val < 1 || val > 10) {
            setStyle({ backgroundColor: '#ec3643' });
            sleep(500).then(x => setStyle({ backgroundColor: 'white' }));
            props.f('');
        } else {
            props.f(Number(val));
        }
    }

    return (
        <input className={props.className} 
        value={ props.val }
        style={ style }
        onChange={ (e) => updateVal(e.target.value) } />
    );
}

export default TextInput;