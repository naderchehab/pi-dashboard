import React, {Component} from 'react';
import utils from '../utils/utils';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.state = {
            username: '',
            password: ''
        };
    }
    componentDidMount() {

    }

    handleLoginClick() {
        $.ajax({
            url: '/login',
            method: 'POST',
            data: JSON.stringify({username: this.state.username, password: this.state.password}),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: (data) => {
                console.log(data);
            }
        });
    }

    handleUsernameChange(e) {
        this.setState({username: e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    render() {
        return (
            <div>
                <h4>Login</h4>
                <form className="login-form">
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input id="username"value={this.state.username} onChange={this.handleUsernameChange}></input>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input id="password" value={this.state.password} onChange={this.handlePasswordChange}></input>
                    </div>
                    <input type="submit" onClick={this.handleLoginClick}></input>
                </form>
            </div>
        );
    }
}
