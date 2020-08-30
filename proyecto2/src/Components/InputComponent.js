import React from 'react';

const InputComponent = (props) => {
    const inputComponent = <input onChange={props.changed} value={props.word} />;


    return inputComponent;
}


export default InputComponent;