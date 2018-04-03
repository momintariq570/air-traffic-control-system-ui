import React from 'react';
import './Aircraft.css';

/*
Aircraft component
*/
const aircraft = (props) => {
    return (
        <div className="Aircraft">
            <p>Id: {props.id}</p>
            <p>Type: {props.type}</p>
            <p>Size: {props.size}</p>
        </div>
    );
};

export default aircraft;