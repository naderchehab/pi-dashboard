import React, {Component} from 'react';
import $ from 'jquery';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            powerOn: false
        };
    }

    componentDidMount() {
        this.callApi('/getState', 'GET');
    }

    handleChange() {
        this.callApi(this.state.powerOn ? '/off' : '/on', 'POST');
    }

    callApi(url, method) {
        $.ajax({
            url: url,
            method,
            contentType: 'application/json; charset=utf-8',
            dataType : 'json',
            success: (data) => {
                if (data.success) {
                    this.setState({powerOn: data.powerOn});
                }
                else {
                    alert(data.error);
                }
            }
        });
    }

    handleButtonClick() {
        this.setState({powerOn: true});
    }

    render() {
        return (
            <div className="container">
                <h1>Dashboard</h1>
                <h2>Outlet Status</h2>
                <div className="slide">
                  <input type="checkbox" value="None" id="outlet-status" name="check" checked={this.state.powerOn} onClick={this.handleChange} />
                  <label htmlFor="outlet-status"></label>
                </div>
            </div>
        );
    }
}
