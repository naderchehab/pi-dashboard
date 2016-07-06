import React, {Component} from 'react';
import PowerOutlet from './PowerOutlet';
import TemperatureChart from './TemperatureChart';
import FileItems from './FileItems';

export default class Home extends Component {
    render() {
        return (
            <div className="container">
                <h1>Dashboard</h1>
                <PowerOutlet/>
                <TemperatureChart/>
                <FileItems/>
            </div>
        );
    }
}
