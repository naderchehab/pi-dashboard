import React, {Component} from 'react';
import utils from '../../utils/utils';
import Toggle from '../Toggle/Toggle';

export default class PowerOutlet extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            powerOutletOn: false
        };
    }

    componentDidMount() {
        utils.callApi('/getState/powerOutlet', 'GET', data => this.setState({powerOutletOn: data.docs[0].state}));
    }

    handleChange() {
        if (window.confirm('Are you sure?')) {
            utils.callApi(this.state.powerOutletOn
                ? '/toggle/powerOutlet/off'
                : '/toggle/powerOutlet/on', 'POST', data => this.setState({powerOutletOn: data.state}));
        }
    }

    render() {
        return (
            <Toggle id='power-outlet-status' label='Power Outlet' checked={this.state.powerOutletOn} onClick={this.handleChange} />
        );
    }
}
