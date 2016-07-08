import React, {Component} from 'react';
import $ from 'jquery';
import utils from '../utils/utils';
import Input from 'react-toolbox/lib/input';
import {Button} from 'react-toolbox/lib/button';
import {Card, CardMedia, CardTitle, CardText, CardActions} from 'react-toolbox/lib/card';

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

    handleSubmit(e) {
        e.preventDefault();
        $.ajax({
            url: '/login',
            method: 'POST',
            data: JSON.stringify({username: this.state.username, password: this.state.password}),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        }).done((data, textStatus, jqXHR) => {
            this.props.onLogin(data.isLoggedIn);
        }).fail((jqXHR, textStatus, errorThrown) => {
            this.props.onLogin(false);
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
                <Card className='login-card'>
                    <CardTitle title='Login'/>
                    <CardText>
                        <form className='login-form'>
                            <Input id='username' label='Username' name='username' value={this.state.username} onChange={this.handleUsernameChange}/>
                            <Input id='password' type='password' label='Password' name='password' value={this.state.password} onChange={this.handlePasswordChange}/>
                        </form>
                    </CardText>
                    <CardActions>
                        <Button label='Login' onClick={this.handleSubmit} raised primary/>
                    </CardActions>
                </Card>
            </div>
        );
    }
}
