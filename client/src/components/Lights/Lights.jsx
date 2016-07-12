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
