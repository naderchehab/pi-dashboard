import React, {Component} from 'react';
import rd3 from 'rd3';
import utils from '../../utils/utils';
import theme from './temperatureChart.scss';
import Label from '../Label/Label';

const LineChart = rd3.LineChart;
let timeFormat = d3.time.format('%Y-%m-%dT%H:%M:%S.%LZ');

export default class Chart extends Component {
    constructor(props) {
        super(props);
        this.getIndoorTemps = this.getIndoorTemps.bind(this);
        this.state = {
            indoorTemps: [{x:'2016-07-09T09:00', y: 0}]
        };
    }

    componentDidMount() {
        utils.callApi('/getState/temperature', 'GET', data => {
            if (!data.success) {
                alert('Error getting temperatures');
            }
            let indoorTemps = data.docs.map(temp => {
                return {x: timeFormat.parse(temp.insertDate), y: temp.temperature};
            });
            this.setState({indoorTemps});
        });
    }

    getIndoorTemps() {
        return [{
            name: 'Temp',
            values: this.state.indoorTemps,
            strokeWidth: 2
        }];
    }

    render() {
        let latestTemp = this.state.indoorTemps[0].x;
        let earliestTemp = this.state.indoorTemps[this.state.indoorTemps.length - 1].x;
        return (
            <div>
                <Label text={'Indoor Temperature'} />
                <LineChart legend={true} data={this.getIndoorTemps()} width='100%' height='500px'
                    viewBoxObject={{x: 0,y: 0,width: 2000, height: 600}} title=''
                    yAxisLabel='°C' xAxisLabel='Time' domain={{x: [earliestTemp, latestTemp],y: [0,40]}} gridHorizontal={true}/>
            </div>
        );
    }
}
