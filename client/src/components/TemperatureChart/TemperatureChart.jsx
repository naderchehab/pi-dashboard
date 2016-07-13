import React, {Component} from 'react';
import rd3 from 'rd3';
import utils from '../../utils/utils';
import Label from '../Label/Label';

const LineChart = rd3.LineChart;
let timeFormat = d3.time.format('%Y-%m-%dT%H:%M:%S.%LZ');

export default class Chart extends Component {
    constructor(props) {
        super(props);
        this.getTemps = this.getTemps.bind(this);
        this.getHumidity = this.getHumidity.bind(this);
        this.state = {
            temps: [{x:'2016-07-09T09:00', y: 0}],
            humidity: [{x:'2016-07-09T09:00', y: 0}]
        };
    }

    componentDidMount() {
        utils.callApi('/getState/temperature', 'GET', data => {
            if (!data.success) {
                alert('Error getting temperatures');
            }
            let temps = data.docs.map(temp => {
                return {x: timeFormat.parse(temp.insertDate), y: temp.temperature};
            });
            let humidity = data.docs.map(humidity => {
                return {x: timeFormat.parse(humidity.insertDate), y: humidity.humidity};
            });
            this.setState({temps, humidity});
        });
    }

    getTemps() {
        return [{
            name: 'Temp',
            values: this.state.temps,
            strokeWidth: 2
        }];
    }

    getHumidity() {
        return [{
            name: 'Humidity',
            values: this.state.humidity,
            strokeWidth: 2
        }];
    }

    render() {
        let latestTemp = this.state.temps[0].x;
        let earliestTemp = this.state.temps[this.state.temps.length - 1].x;
        let latestHumidity = this.state.humidity[0].x;
        let earliestHumidity = this.state.humidity[this.state.humidity.length - 1].x;
        return (
            <div>
                <Label text={'Indoor Temperature & Humidity'} />
                <LineChart legend={true} data={this.getTemps()} width='100%' height='500px'
                    viewBoxObject={{x: 0, y: 0, width: 2000, height: 600}} title=''
                    yAxisLabel='°C' xAxisLabel='Time' domain={{x: [earliestTemp, latestTemp], y: [0,40]}} gridHorizontal={true}/>

                <LineChart legend={true} data={this.getHumidity()} width='100%' height='500px'
                        viewBoxObject={{x: 0, y: 0, width: 2000, height: 600}} title=''
                        yAxisLabel='%' xAxisLabel='Time' domain={{x: [earliestHumidity, latestHumidity], y: [0,100]}} gridHorizontal={true}/>
            </div>
        );
    }
}
