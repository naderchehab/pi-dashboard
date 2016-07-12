import React, {Component} from 'react';
import utils from '../../utils/utils';
import theme from './lights.scss';
import Label from '../Label/Label';

export default class Lights extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            lightsOn: false
        };
    }

    componentDidMount() {
        utils.callApi('/getState', 'GET', data => this.setState({lightsOn: data.lightsOn}));
    }

    handleChange() {
        if (window.confirm('Are you sure?')) {
            utils.callApi(this.state.lightsOn
                ? '/turnOff/lights'
                : '/turnOn/lights', 'POST', data => this.setState({lightsOn: data.lightsOn}));
        }
    }

    render() {
        return (
            <div>
                <Label text={'Lights'} />
                <div className={theme.slide}>
                    <input type='checkbox' value='None' id='lights-status' name='check' checked={this.state.lightsOn} onClick={this.handleChange}/>
                    <label htmlFor='lights-status'></label>
                </div>
            </div>
        );
    }
}
