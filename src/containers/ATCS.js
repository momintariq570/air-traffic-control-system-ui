import React, { Component } from 'react';
import Aircrafts from '../components/Aircrafts';
import './ATCS.css';
import axios from '../axios-instance';

class ATCS extends Component {

    // Application state
    state = {
        aircrafts: [],
        newAircraftType: 'EMERGENCY',
        newAircraftSize: 'LARGE',
        isATCSRunning: false
    }

    // Boots the ATCS service
    bootATCSHandler = () => {
        axios.get('/boot')
            .then(resp => {
                console.log(resp);
                this.setState({
                    ...this.state,
                    aircrafts: resp.data,
                    isATCSRunning: !this.state.isATCSRunning
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    // Adds an aircraft to the ATCS service queue
    enqueueAircraftHandler = () => {
        const type = this.state.newAircraftType;
        const size = this.state.newAircraftSize;

        axios.get('/enqueue/' + type + '/' + size)
            .then(resp => {
                console.log(resp);
                this.setState({
                    ...this.state,
                    aircrafts: resp.data
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    // Removes an aircraft from the ATCS service queue
    dequeueAircraftHandler = () => {
        axios.get('/dequeue')
            .then(resp => {
                console.log(resp);
                this.setState({
                    ...this.state,
                    aircrafts: resp.data
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    // Reads user input and saves it to the state
    inputHandler = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    // Renders application JSX
    render() {
        let bootButtonLabel = 'TURN ON ATCS';
        let showAircrafts = null;
        if(this.state.isATCSRunning) {
            bootButtonLabel = 'TURN OFF ATCS';
            showAircrafts = <Aircrafts aircrafts = {this.state.aircrafts} styles = {this.airCraftStyles}/>;
        }

        return (
            <div className="ATCS">
                <button onClick={this.bootATCSHandler}>{bootButtonLabel}</button>
                <select
                    onChange={(event) => this.inputHandler(event)}
                    value={this.state.newAircraftType}
                    name="newAircraftType">
                    <option>EMERGENCY</option>
                    <option>VIP</option>
                    <option>PASSENGER</option>
                    <option>CARGO</option>
                </select>
                <select
                    onChange={(event) => this.inputHandler(event)}
                    value={this.state.newAircraftSize}
                    name="newAircraftSize">
                    <option>LARGE</option>
                    <option>SMALL</option>
                </select>
                <button onClick={this.enqueueAircraftHandler}>ENQUEUE</button>
                <button onClick={this.dequeueAircraftHandler}>DEQUEUE</button>
                {showAircrafts}
            </div>
        );
    }
}

export default ATCS;