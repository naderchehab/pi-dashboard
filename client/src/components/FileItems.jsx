import React, {Component} from 'react';
import $ from 'jquery';
import FileItem from './FileItem';

export default class FileItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: []
        };
    }

    componentDidMount() {
        $.ajax({
            url: '/getFiles',
            method: 'GET',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: (data) => {
                if (data.success) {
                    this.setState({files: data.files});
                } else {
                    alert(data.error);
                }
            }
        });
    }

    render() {
        return (
            <div>
                <h4>Files</h4>
                <div className="file-list">
                    <ul>
                        {this.state.files.map(filename => <FileItem key={filename} filename={filename} />)}
                    </ul>
                </div>
            </div>
        );
    }
}
