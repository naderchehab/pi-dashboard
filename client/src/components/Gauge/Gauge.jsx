import React, {Component} from 'react';
import theme from './gauge.scss';

export default class Toggle extends Component {
    render() {
        return (
            <div className={theme.container}>
        		<div className={theme.gauge1}></div>
        		<div className={theme.gauge2}></div>
        		<div className={theme.gauge3}></div>
        		<div className={theme.gaugeData}><h1 id="percent">0%</h1><br/>Hover On Me</div>
        	</div>
        );
    }
}
