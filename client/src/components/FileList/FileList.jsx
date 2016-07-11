import React, {Component} from 'react';
import FileItem from './FileItem';
import utils from '../../utils/utils';
import Label from '../Label/Label';

export default class FileList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: []
        };
    }

    componentDidMount() {
        utils.callApi('/getFiles', 'GET', data => this.setState({files: data.files}));
    }

    render() {
        return (
            <div>
                <Label text={'Files'} />
                <div>
                    <ul>
                        {this.state.files.map(filename => <FileItem key={filename} filename={filename}/>)}
                    </ul>
                </div>
            </div>
        );
    }
}
