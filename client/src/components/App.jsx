import React, {Component} from 'react';
import utils from '../utils/utils';
import Login from './Login';
import Home from './Home';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        };
    }
    componentDidMount() {
        utils.callApi('/isLoggedIn', 'GET', data => this.setState({isLoggedIn: data.isLoggedIn}));
    }
    render() {
        let home;
        if (this.state.isLoggedIn) {
            home = <Home />;
        }
        else {
            home = <Login />;
        }
        return (
            <div>
                {home}
            </div>
        );
    }
}
