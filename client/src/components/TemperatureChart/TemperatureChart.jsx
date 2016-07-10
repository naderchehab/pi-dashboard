import React, {Component} from 'react';
import rd3 from 'rd3';
import utils from '../../utils/utils';
import theme from './temperatureChart.scss';

const LineChart = rd3.LineChart;
let timeFormat = d3.time.format('%Y-%m-%dT%H:%M');
let lineData = [
    {
        name: 'Temp',
        values: [
            {
                x: timeFormat.parse('2016-07-09T10:00'),
                y: 20
            }, {
                x: timeFormat.parse('2016-07-09T11:00'),
                y: 30
            }, {
                x: timeFormat.parse('2016-07-09T12:00'),
                y: 10
            }, {
                x: timeFormat.parse('2016-07-09T13:00'),
                y: 5
            }, {
                x: timeFormat.parse('2016-07-09T14:00'),
                y: 8
            }, {
                x: timeFormat.parse('2016-07-09T15:00'),
                y: 15
            }, {
                x: timeFormat.parse('2016-07-09T16:00'),
                y: 10
            }
        ],
        strokeWidth: 3,
        strokeDashArray: '5,5'
    }
];

export default class Chart extends Component {
    render() {
        return (
            <div>
                <label>Indoor Temperature</label>
                <LineChart legend={true} data={lineData} width='100%' height={'600px'}
                    viewBoxObject={{x: 0,y: 0,width: 1600,height: 600}} title=''
                    yAxisLabel='°C' xAxisLabel='Time' domain={{x: [timeFormat.parse('2016-07-09T00:00'), timeFormat.parse('2016-07-10T00:00')],y: [0,50]}} gridHorizontal={true}/>
            </div>
        );
    }
}
