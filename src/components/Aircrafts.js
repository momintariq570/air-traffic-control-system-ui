import React, { Component } from 'react';
import Aircraft from './Aircraft';

/* 
Collection of aircrafts received as props
from the ATCS component 
*/
const Aircrafts = (props) => {
    return (
        props.aircrafts.map(aircraft => {
            return <Aircraft 
                    key={aircraft.id} 
                    id = {aircraft.id} 
                    type={aircraft.type} 
                    size={aircraft.size}/>
        })
    );
}

export default Aircrafts;