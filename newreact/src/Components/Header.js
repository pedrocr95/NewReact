import React from 'react';
import '../Styles/Persons/persons.css';

const Header = (props) => {
    const header = <div className="person">
        <div>{props.name} tiene {props.age}</div>
        <input onChange={props.changed} value={props.name} />
        <button onClick={props.click} > Delete</button>
    </div>;

    return header;
}


export default Header;