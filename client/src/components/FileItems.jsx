import React, {Component} from 'react';
import {Card, CardMedia, CardTitle, CardText, CardActions} from 'react-toolbox/lib/card';
import FileItem from './FileItem';
import utils from '../utils/utils';

export default class FileItems extends Component {
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
            <Card>
                <CardTitle>Files</CardTitle>
                <CardText>
                    <div className="file-list">
                        <ul>
                            {this.state.files.map(filename => <FileItem key={filename} filename={filename}/>)}
                        </ul>
                    </div>
                </CardText>
            </Card>
        );
    }
}
