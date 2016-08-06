import React from 'react';
import $ from 'jquery';
import Dropzone from 'react-dropzone';

class ImageUpload extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      files: []
    }
  }
  onDrop(files){
    this.setState({
      files: files
    })
    // TODO: do we need this?
    let data = new FormData();
    $.each(files, function(key, value){
        data.append(key, value);
    });

    // Read and send file as a base64 encoded string
    const reader = new FileReader();
    const file = files[0];
    reader.onloadend = () => {
      $.ajax({
        url:'/api/image',
        type:'POST',
        contentType: 'application/json',
        data: JSON.stringify({image: reader.result}),
        success: function(results) {
          //maybe redirect to result page
        },
        error: function(err) {
          console.log(err);
        }
      });
    }
    reader.readAsDataURL(file);
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
    )
  }
}

export default ImageUpload;
