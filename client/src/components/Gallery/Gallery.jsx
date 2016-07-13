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

export default class Home extends Component {
    render() {
        return (
            <div>
                <ul className={theme.gallery}>
                    <li className={theme.galleryElement + ' ' + theme.galleryFullWidth}>
                        <Label text={'Welcome to the Pi Dashboard'}/>
                    </li>
                    <li className={theme.galleryElement + ' ' + theme.galleryQuarterWidth}>
                        <Gauge/>
                    </li>
                    <li className={theme.galleryElement + ' ' + theme.galleryQuarterWidth}>
                        <Gauge/>
                    </li>
                    <li className={theme.galleryElement + ' ' + theme.galleryQuarterWidth}>
                        <Gauge/>
                    </li>
                    <li className={theme.galleryElement + ' ' + theme.galleryQuarterWidth}>
                        <Gauge/>
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
                        <TemperatureChart/>
                    </li>
                    <li className={theme.galleryElement + ' ' + theme.galleryFullWidth}>
                        <FileItems/>
                    </li>
                </ul>
            </div>
        );
    }
}
