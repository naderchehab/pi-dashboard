import React, {Component} from 'react';
import rd3 from 'rd3';
import utils from '../../utils/utils';
import theme from './temperatureChart.scss';
import Label from '../Label/Label';

const LineChart = rd3.LineChart;
let timeFormat = d3.time.format('%Y-%m-%dT%H:%M');

export default class Chart extends Component {
    constructor(props) {
        super(props);
        this.getIndoorTemps = this.getIndoorTemps.bind(this);
        this.state = {
            indoorTemps: [{x:0, y: 0}]
        };
    }

    componentDidMount() {
        utils.callApi('/getIndoorTemps', 'GET', data => {
            let indoorTemps = data.indoorTemps.map(temp => {
                return {x: timeFormat.parse(temp.x), y: temp.y};
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
        return (
            <div>
                <Label text={'Indoor Temperature'} />
                <LineChart legend={true} data={this.getIndoorTemps()} width='100%' height={'600px'}
                    viewBoxObject={{x: 0,y: 0,width: 1600, height: 600}} title=''
                    yAxisLabel='°C' xAxisLabel='Time' domain={{x: [timeFormat.parse('2016-07-09T00:00'), timeFormat.parse('2016-07-10T00:00')],y: [0,40]}} gridHorizontal={true}/>
            </div>
        );
    }
}
