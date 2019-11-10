import React, { useState } from 'react';
import sleep from '../utils/Sleep';

function TextInput({ className, val, inputTest, number, f, placeholder, testId }) {
    const [style, setStyle] = useState({ backgroundColor: 'white' });

    const updateVal = (val) => {
        // show a red indicator if value fails input test
        if (inputTest(val)) {
            setStyle({ backgroundColor: '#ec3643' });
            sleep(500).then(x => setStyle({ backgroundColor: 'white' }));
            f('');
        } else {
            if (number) {
                f(Number(val));
            } else {
                f(val);
            }
        }
    }

    return (
        <input className={className}
            value={val}
            style={style}
            onChange={(e) => updateVal(e.target.value)}
            placeholder={placeholder}
            data-testid={testId} />
    );
}

export default TextInput;