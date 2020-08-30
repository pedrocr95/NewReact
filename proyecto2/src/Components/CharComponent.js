import React from 'react';
import '../App.css';
const CharComponent = (props) => {

    const charComponent = <div className="charComponent" onClick={props.delete}>{props.word}</div>;

    return charComponent;
}


export default CharComponent;