import React, {Component} from 'react';
import Masonry from 'react-masonry-component';
import PowerOutlet from '../PowerOutlet/PowerOutlet';
import TemperatureChart from '../TemperatureChart/TemperatureChart';
import FileItems from '../FileList/FileList';
import theme from './gallery.scss';

export default class Home extends Component {
    render() {
        return (
            <Masonry className={theme.masonry} elementType={'ul'}>
                <li className={theme.masonryElement + ' ' + theme.masonryHalfWidth}>
                    <PowerOutlet/>
                </li>
                <li className={theme.masonryElement + ' ' + theme.masonryHalfWidth}>
                    <FileItems/>
                </li>
                <li className={theme.masonryElement + ' ' + theme.masonryFullWidth}>
                    <TemperatureChart/>
                </li>
            </Masonry>
        );
    }
}
