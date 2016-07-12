import React, {Component} from 'react';
import utils from '../../utils/utils';
import theme from './powerOutlet.scss';
import Label from '../Label/Label';

export default class PowerOutlet extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            powerOn: false
        };
    }

    componentDidMount() {
        utils.callApi('/getState', 'GET', data => this.setState({powerOn: data.powerOn}));
    }

    handleChange() {
        if (window.confirm('Are you sure?')) {
            console.log(this.state.powerOn);
            utils.callApi(this.state.powerOn
                ? '/turnOff/powerOutlet'
                : '/turnOn/powerOutlet', 'POST', data => this.setState({powerOn: data.powerOn}));
        }
    }

    render() {
        return (
            <div>
                <Label text={'Power Outlet'} />
                <div className={theme.slide}>
                    <input type='checkbox' value='None' id='outlet-status' name='check' checked={this.state.powerOn} onClick={this.handleChange}/>
                    <label htmlFor='outlet-status'></label>
                </div>
            </div>
        );
    }
}
