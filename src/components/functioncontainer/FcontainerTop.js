import React, { useState } from 'react';
import TextInput from '../controls/TextInput';
import Button from '../controls/Button';

function Fcontainer() {

    return (
        <div className='fContainer'>
            <TextInput className='fInput' />
            <div className='fDiv'> Rᵢ </div>
            <div className='opButtonContainer'>
                <Button className='opButton' />
                <Button className='opButton' />
            </div>
            <TextInput className='fInput' />
            <TextInput className='fInput' />
            <div className='fDiv'> Rⱼ </div>
            <Button className='fButton' />
        </div>
    )
}

export default Fcontainer;