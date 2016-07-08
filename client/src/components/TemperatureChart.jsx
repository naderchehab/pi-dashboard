import React, {Component} from 'react';
import rd3 from 'rd3';
import {Card, CardMedia, CardTitle, CardText, CardActions} from 'react-toolbox/lib/card';
import utils from '../utils/utils';

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
        return (
            <Card>
                <CardTitle title="Indoor Temperature"/>
                <CardText>
                    <LineChart legend={true} data={lineData} width='100%' height={'400px'} viewBoxObject={{
                    x: 0,
                    y: 0,
                    width: 500,
                    height: 400
                }} title='' yAxisLabel='°C' xAxisLabel='Time' domain={{
                    x: [
                        , 6
                    ],
                    y: [-10]
                }} gridHorizontal={true}/>
                </CardText>
            </Card>
    );
    }
}
