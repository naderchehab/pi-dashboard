import React, {Component} from 'react';
import Masonry from 'react-masonry-component';
import PowerOutlet from './PowerOutlet';
import TemperatureChart from './TemperatureChart';
import FileItems from './FileItems';

export default class Home extends Component {
    render() {
        return (
            <Masonry className={'masonry-class'} elementType={'ul'}>
                <li className="masonry-element-class">
                    <PowerOutlet/>
                </li>
                <li className="masonry-element-class">
                    <TemperatureChart/>
                </li>
                <li className="masonry-element-class">
                    <FileItems/>
                </li>
            </Masonry>
        );
    }
}
