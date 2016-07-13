import React, {Component} from 'react';
import theme from './toggle.scss';
import Label from '../Label/Label';

export default class Toggle extends Component {
    render() {
        return (
            <div>
                <Label text={this.props.label} />
                <div className={theme.slide}>
                    <input type='checkbox' value='None' id={this.props.id} name='check' checked={this.props.checked} onClick={this.props.onClick}/>
                    <label htmlFor={this.props.id}></label>
                </div>
            </div>
        );
    }
}
