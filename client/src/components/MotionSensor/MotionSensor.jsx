import React, {Component} from 'react';
import utils from '../../utils/utils';
import Toggle from '../Toggle/Toggle';

export default class MotionSensor extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            webcamOn: false
        };
    }

    componentDidMount() {
        utils.callApi('/getState/motionSensor', 'GET', data => this.setState({motionSensorOn: data.docs[0].state}));
    }

    handleChange() {
        if (window.confirm('Are you sure?')) {
            utils.callApi(this.state.motionSensorOn
                ? '/toggle/motionSensor/off'
                : '/toggle/motionSensor/on', 'POST', data => this.setState({motionSensorOn: data.state}));
        }
    }

    render() {
        return (
            <Toggle id='motion-sensor-status' label='Motion Sensor' checked={this.state.motionSensorOn} onClick={this.handleChange} />
        );
    }
}
