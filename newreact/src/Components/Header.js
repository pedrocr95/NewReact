import React from 'react';

const Header = (props) => {
    const header = <div>
        <div>{props.name} tiene {props.age}</div>
        <input onChange={props.write} />
    </div>;

    return header;
}


export default Header;