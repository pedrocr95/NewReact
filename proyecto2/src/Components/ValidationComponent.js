import React from 'react';

const ValidationComponent = (props) => {
    const valueWordValidation = ['long enough', 'too short'];
    const word = props.validation;
    const meet = word.length > 5 ? valueWordValidation[0] : valueWordValidation[1];

    const validationComponent = <div >{meet}</div>;

    return validationComponent;
}


export default ValidationComponent;