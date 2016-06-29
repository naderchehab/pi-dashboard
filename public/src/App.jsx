import React, {Component} from 'react';
import Toggle from 'react-toggle';
import $ from 'jquery';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            checked: false
        };
    }

    handleChange() {
        $.ajax({
            url: this.state.checked ? '/off' : '/on',
            method: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType : 'json',
            success: (data) => {
                if (data.success) {
                    this.setState({checked: data.state});
                }
                else {
                    alert(data.error);
                }
            }
        });
    }

    render() {
        return (
            <div className="container">
                <h1>Hello, world!</h1>
                <label>
                    <Toggle defaultChecked={this.state.checked} onChange={this.handleChange}/>
                </label>
            </div>
        );
    }
}
