import React, {Component} from 'react';
import TemperatureChart from '../TemperatureChart/TemperatureChart';
import AirConditioner from '../AirConditioner/AirConditioner';
import PowerOutlet from '../PowerOutlet/PowerOutlet';
import FileItems from '../FileList/FileList';
import Lights from '../Lights/Lights';
import Webcam from '../Webcam/Webcam';
import Gauge from '../Gauge/Gauge';
import Label from '../Label/Label';
import theme from './gallery.scss';

export default class Gallery extends Component {
    constructor(props) {
        super(props);
        this.handleTempReadingReceived = this.handleTempReadingReceived.bind(this);
        this.state = {
            temperature: 0,
            humidity: 0
        };
    }

    handleTempReadingReceived(reading) {
        this.setState({
            temperature: reading.temperature,
            humidity: reading.humidity
        });
    }

    render() {
        return (
            <div>
                <ul className={theme.gallery}>
                    <li className={theme.galleryElement + ' ' + theme.galleryFullWidth}>
                        <Label text={'Welcome to the Pi Dashboard'}/>
                    </li>
                    <li className={theme.galleryElement + ' ' + theme.galleryQuarterWidth}>
                        <Gauge value={this.state.temperature} maxValue={40} unit={'℃'} label={'Temperature'} />
                    </li>
                    <li className={theme.galleryElement + ' ' + theme.galleryQuarterWidth}>
                        <Gauge value={this.state.humidity} maxValue={100} unit={'%'} label={'Humidity'} />
                    </li>
                    <li className={theme.galleryElement + ' ' + theme.galleryQuarterWidth}>
                        <Gauge value={this.state.temperature} maxValue={40} unit={'℃'} />
                    </li>
                    <li className={theme.galleryElement + ' ' + theme.galleryQuarterWidth}>
                        <Gauge value={this.state.humidity} maxValue={100} unit={'%'} />
                    </li>
                    <li className={theme.galleryElement + ' ' + theme.galleryQuarterWidth}>
                        <PowerOutlet/>
                    </li>
                    <li className={theme.galleryElement + ' ' + theme.galleryQuarterWidth}>
                        <Lights/>
                    </li>
                    <li className={theme.galleryElement + ' ' + theme.galleryQuarterWidth}>
                        <AirConditioner/>
                    </li>
                    <li className={theme.galleryElement + ' ' + theme.galleryQuarterWidth}>
                        <Webcam/>
                    </li>
                    <li className={theme.galleryElement + ' ' + theme.galleryFullWidth}>
                        <TemperatureChart onTempReadingReceived={this.handleTempReadingReceived}/>
                    </li>
                    <li className={theme.galleryElement + ' ' + theme.galleryFullWidth}>
                        <FileItems/>
                    </li>
                </ul>
            </div>
        );
    }
}
