import React, {Component} from 'react';
import theme from './gauge.scss';

export default class Gauge extends Component {
    render() {
        let value = (0.5 * this.props.value)/this.props.maxValue;
        if (value) {
            document.querySelector('.' + theme.outer).style.transform = 'rotate(' + value + 'turn)';
        }
        return (
            <div className={theme.container} id={this.props.label}>
                <div className={theme.inner}></div>
                <div className={theme.outer}></div>
                <div className={theme.gaugeData}>
                    <h1>{this.props.value}{this.props.unit}</h1>
                </div>
            </div>
        );
    }
}
