import React, {Component} from 'react';
import utils from '../utils/utils';
import Login from './Login';
import Home from './Home';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.state = {
            isLoggedIn: true
        };
    }

    componentDidMount() {
        utils.callApi('/isLoggedIn', 'GET', data => this.setState({isLoggedIn: data.isLoggedIn}));
    }

    handleLogin(isLoggedIn) {
        this.setState({isLoggedIn: isLoggedIn});
    }

    render() {
        let home;
        if (this.state.isLoggedIn) {
            home = <Home />;
        }
        else {
            home = <Login onLogin={this.handleLogin} />;
        }
        return (
            <div>
                {home}
            </div>
        );
    }
}
