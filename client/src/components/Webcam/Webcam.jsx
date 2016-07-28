import React, {Component} from 'react';
import utils from '../../utils/utils';
import Toggle from '../Toggle/Toggle';
import theme from './webcam.scss';

export default class Webcam extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            webcamOn: false
        };
    }

    componentDidMount() {
        utils.callApi('/getState/webcam', 'GET', data => this.setState({webcamOn: data.docs[0].state}));
    }

    handleChange() {
        if (window.confirm('Are you sure?')) {
            utils.callApi(this.state.webcamOn
                ? '/toggle/webcam/off'
                : '/toggle/webcam/on', 'POST', data => {
                this.setState({webcamOn: data.state});
                setTimeout(() => document.getElementById('webcam-iframe').contentWindow.location.reload(), 5000);
            });
        }
    }

    render() {
        return (
            <div>
                <iframe id='webcam-iframe' src="https://www.goodrobot6.com:8082"></iframe>
                <Toggle id='webcam-status' label='Webcam' checked={this.state.webcamOn} onClick={this.handleChange}/>
            </div>
        );
    }
}
