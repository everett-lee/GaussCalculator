import React, { useState } from 'react';
import sleep from '../utils/Sleep';

function TextInput(props) {
    const [style, setStyle] = useState({ backgroundColor: 'white' });

    const updateVal = (val) => {
        // show a red indicator if value is not valid
        if (props.inputTest(val)) {
            setStyle({ backgroundColor: '#ec3643' });
            sleep(500).then(x => setStyle({ backgroundColor: 'white' }));
            props.f('');
        } else {
            if (props.number) {
                props.f(Number(val));
            } else {
                props.f(val);
            }
        }
    }

    return (
        <input className={props.className} 
        value={ props.val }
        style={ style }
        onChange={ (e) => updateVal(e.target.value) } 
        placeholder={props.placeholder}
        data-testid={props.testId} />
    );
}

export default TextInput;