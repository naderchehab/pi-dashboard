import React, {Component} from 'react';
import FileItem from './FileItem';
import utils from '../../utils/utils';

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
                <label className='cellTitle'>Files</label>
                <div className="file-list">
                    <ul>
                        {this.state.files.map(filename => <FileItem key={filename} filename={filename}/>)}
                    </ul>
                </div>
            </div>
        );
    }
}
