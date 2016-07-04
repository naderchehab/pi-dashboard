import React, {Component} from 'react';

export default class FileItem extends Component {
    render() {
        return (
            <li><a href={'/files/' + this.props.filename}>{this.props.filename}</a></li>
        );
    }
}
