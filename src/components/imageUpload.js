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
    let data = new FormData();
    $.each(files, function(key, value){
        data.append(key, value);
    });

    // Read and send file as a base64 encoded string
    const reader = new FileReader();
    const file = files[0];
    reader.onloadend = () => {
      $.ajax({
        url:"/api/image",
        type:"POST",
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
        {this.state.files.map((file,index) => <img key={index}src={file.preview} width='200' alt={file.name}/> )}
        </div>
      </div>
    )
  }
}
// class ImageUpload extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       file: '',
//       imagePreviewUrl: ''
//     };
//   }

//   handleSubmit(e) {
//     e.preventDefault();
//     //console.log('handle uploading-', this.state.file);
//     //console.log('imageurl', this.state.imagePreviewUrl);
//     $.ajax({
//       url:"/api/image",
//       type:"POST",
//       data: this.state.file,
//       success: function(results) {
//         //maybe redirect to result page
//       },
//       error: function(err) {
//         console.log(err);
//       }
//     });
//   }

//   handleImageChange(e) {
//     e.preventDefault();

//     let reader = new FileReader();
//     let file = e.target.files[0];
//     reader.onloadend = () => {
//       this.setState({
//         file: file,
//         imagePreviewUrl: reader.result
//       });
//     }

//     reader.readAsDataURL(file)
//   }
//   render() {
//     let {imagePreviewUrl} = this.state;
//     let $imagePreview = null;
//     if (imagePreviewUrl) {
//       $imagePreview = (<img src={imagePreviewUrl} />);
//     } else {
//       $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
//     }

//     return (
//       <div className="previewComponent">
//         <form onSubmit={(e)=>this.handleSubmit(e)}>
//           <input className="fileInput" type="file" onChange={(e)=>this.handleImageChange(e)} />
//           <button className="submitButton" type="submit" onClick={(e)=>this.handleSubmit(e)}>Upload Image</button>
//         </form>
//         <div className="imgPreview">
//           {$imagePreview}
//         </div>
//       </div>
//     )
//   }
// }
export default ImageUpload;
