import React, {Component} from 'react';
import PowerOutlet from '../PowerOutlet/PowerOutlet';
import TemperatureChart from '../TemperatureChart/TemperatureChart';
import FileItems from '../FileList/FileList';
import Label from '../Label/Label';
import theme from './gallery.scss';

export default class Home extends Component {
    render() {
        return (
            <div>
                <ul className={theme.gallery}>
                    <li className={theme.galleryElement + ' ' + theme.galleryFullWidth}>
                        <Label text={'Welcome to the the Pi Dashboard'}/>
                    </li>
                    <li className={theme.galleryElement + ' ' + theme.galleryFullWidth}>
                        <TemperatureChart/>
                    </li>
                    <li className={theme.galleryElement + ' ' + theme.galleryHalfWidth}>
                        <PowerOutlet/>
                    </li>
                    <li className={theme.galleryElement + ' ' + theme.galleryHalfWidth}>
                        <FileItems/>
                    </li>
                </ul>
            </div>
        );
    }
}
