import React, {Component} from 'react';
import utils from '../../utils/utils';
import Toggle from '../Toggle/Toggle';

export default class Lights extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            lightsOn: false
        };
    }

    componentDidMount() {
        utils.callApi('/getState/lights', 'GET', data => this.setState({lightsOn: data.docs[0].state}));
    }

    handleChange() {
        if (window.confirm('Are you sure?')) {
            utils.callApi(this.state.lightsOn
                ? '/toggle/lights/off'
                : '/toggle/lights/on', 'POST', data => this.setState({lightsOn: data.state}));
        }
    }

    render() {
        return (
            <Toggle id='lights-status' label='Lights' checked={this.state.lightsOn} onClick={this.handleChange} />
        );
    }
}
