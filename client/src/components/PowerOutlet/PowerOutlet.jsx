import React, {Component} from 'react';
import utils from '../../utils/utils';
import theme from './powerOutlet.scss';
import Label from '../Label/Label';

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
            <div>
                <Label text={'Power Outlet'} />
                <div className={theme.slide}>
                    <input type='checkbox' value='None' id='power-outlet-state' name='check' checked={this.state.powerOutletOn} onClick={this.handleChange}/>
                    <label htmlFor='power-outlet-state'></label>
                </div>
            </div>
        );
    }
}
