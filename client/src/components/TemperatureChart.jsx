import React, {Component} from 'react';
import rd3 from 'rd3';

const LineChart = rd3.LineChart;

let lineData = [
    {
        name: 'series1',
        values: [
            {
                x: 0,
                y: 20
            }, {
                x: 1,
                y: 30
            }, {
                x: 2,
                y: 10
            }, {
                x: 3,
                y: 5
            }, {
                x: 4,
                y: 8
            }, {
                x: 5,
                y: 15
            }, {
                x: 6,
                y: 10
            }
        ],
        strokeWidth: 3,
        strokeDashArray: '5,5'
    }
];

export default class Chart extends Component {
    render() {
        return (<LineChart legend={true} data={lineData} width='100%' height={400} viewBoxObject={{
            x: 0,
            y: 0,
            width: 500,
            height: 400
        }} title='Indoor Temperature' yAxisLabel='°C' xAxisLabel='Time' domain={{
            x: [
                , 6
            ],
            y: [-10]
        }} gridHorizontal={true}/>);
    }
}
