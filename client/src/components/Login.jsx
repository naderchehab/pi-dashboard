import React, {Component} from 'react';
import $ from 'jquery';
import utils from '../utils/utils';
import Input from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.state = {
            username: '',
            password: ''
        };
    }
    componentDidMount() {

    }

    handleSubmit(e) {
        e.preventDefault();
        $.ajax({
            url: '/login',
            method: 'POST',
            data: JSON.stringify({username: this.state.username, password: this.state.password}),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        })
        .done((data, textStatus, jqXHR) => {
            location.reload();
        })
        .fail((jqXHR, textStatus, errorThrown) => {
            console.log(errorThrown);
        });
    }

    handleUsernameChange(val) {
        this.setState({username: val});
    }

    handlePasswordChange(val) {
        this.setState({password: val});
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <form className='login-form'>
                    <Input id='username' label='Username' name='username' value={this.state.username} onChange={this.handleUsernameChange}/>
                    <Input id='password' label='Password' name='password' value={this.state.password} onChange={this.handlePasswordChange}/>
                    <Button label='Login' onClick={this.handleSubmit}/>
                </form>
            </div>
        );
    }
}
