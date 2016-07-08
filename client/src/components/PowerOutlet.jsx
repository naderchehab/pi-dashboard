import React, {Component} from 'react';
import {Card, CardMedia, CardTitle, CardText, CardActions} from 'react-toolbox/lib/card';
import utils from '../utils/utils';

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
            utils.callApi(this.state.powerOn ? '/off' : '/on', 'POST', data => this.setState({powerOn: data.powerOn}));
        }
    }

    render() {
        return (
            <Card>
                <CardTitle title="Power Outlet Status"/>
                <CardActions>
                    <div className="slide">
                        <input type="checkbox" value="None" id="outlet-status" name="check" checked={this.state.powerOn} onClick={this.handleChange}/>
                        <label htmlFor="outlet-status"></label>
                    </div>
                </CardActions>
            </Card>
        );
    }
}
