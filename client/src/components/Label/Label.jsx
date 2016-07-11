import React, {Component} from 'react';
import theme from './label.scss';

export default class Label extends Component {
    render() {
        return (
            <label className={theme.label}>{this.props.text}</label>
        );
    }
}
