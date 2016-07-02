import React from 'react';
import PowerOutlet from './PowerOutlet';
import TemperatureChart from './TemperatureChart';

export default class App extends React.Component {
    render() {
        return (
            <div className="container">
                <h1>Dashboard</h1>
                <PowerOutlet/>
                <TemperatureChart/>
            </div>
        );
    }
}
