import React from 'react';
import Dropzone from 'react-dropzone';
import io from 'socket.io-client';

class ImageUpload extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      files: []
    };
  }
  onDrop(files){
    this.setState({
      files: files
    });

    // let data = new FormData();
    // data.append('image', files[0]);

    // const request = new XMLHttpRequest();
    // request.open('POST', "/api/image");
    // request.send(data);

    const socket = io();
    socket.on('connect', data => {
      console.log(data.message);
    });

  }

  render(){
    return (
      <div>
        <Dropzone onDrop={this.onDrop.bind(this)}>
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
        <div>
        {this.state.files.map((file,index) => <img key={index}src={file.preview} width="200" alt={file.name}/> )}
        </div>
      </div>
    );
  }
}

export default ImageUpload;
