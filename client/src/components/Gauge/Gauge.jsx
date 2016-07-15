import React, {Component} from 'react';
import theme from './gauge.scss';

export default class Gauge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        };
    }

    render() {
        let value = (0.5 * this.props.value)/this.props.maxValue;
        if (value) {
            let outerGaugeSelector = '#' + this.props.id + ' .' + theme.outer;
            let outerGauge = document.querySelector(outerGaugeSelector);
            outerGauge.style.transform = 'rotate(' + value + 'turn)';
            if (this.state.value < this.props.maxValue / 3) {
                outerGauge.classList.add(theme.low);
            } else if (this.state.value < this.props.maxValue * 2 / 3) {
                outerGauge.classList.add(theme.medium);
            } else {
                outerGauge.classList.add(theme.high);
            }
        }

        setInterval(() => {
            if(this.state.value < this.props.value) {
                let val = this.state.value + 1;
                this.setState({value: val});
            }
            else {
                if (this.state.value != this.props.value) {
                    this.setState({value: this.props.value});
                    clearInterval();
                }
            }
        }, 10);

        return (
            <div className={theme.container} id={this.props.id}>
                <div className={theme.inner}></div>
                <div className={theme.outer}></div>
                <div className={theme.gaugeData}>
                    <h1>{this.state.value}{this.props.unit}</h1>
                </div>
            </div>
        );
    }
}
