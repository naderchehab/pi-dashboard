import React, {Component} from 'react';
import utils from '../../utils/utils';
import Toggle from '../Toggle/Toggle';

export default class AirConditioner extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            acOn: false
        };
    }

    componentDidMount() {
        utils.callApi('/getState/ac', 'GET', data => this.setState({acOn: data.docs[0].state}));
    }

    handleChange() {
        if (window.confirm('Are you sure?')) {
            utils.callApi(this.state.acOn
                ? '/toggle/ac/off'
                : '/toggle/ac/on', 'POST', data => this.setState({acOn: data.state}));
        }
    }

    render() {
        return (
            <Toggle id='ac-status' label='Air Conditioner' checked={this.state.acOn} onClick={this.handleChange} />
        );
    }
}
