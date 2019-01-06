import React, {Component} from 'react';
import FileBase64 from './react-file-base64.js';


class UploadAvatar extends Component {

  constructor (props) {
    super(props);
    this.state = {selectedImage: null, image: null}
    }
  

fileChangedHandler = (event) => {
  this.setState({selectedImage: event.target.files[0]})
}

uploadHandler = () => { 
  
    const img = base64Img.base64Sync(this.state.selectedFile)
    this.setState({image: img })
    

 
}

  render() {
    const selfie = <img alt="avatar" src={this.state.image} />

    return (
      <div>
      <button>fake</button>
      <button>fake</button>
      <button>fake</button>
      <button>fake</button>
        <input type="file" onChange={this.fileChangedHandler} />>
        <button onClick={this.uploadHandler}>Upload!</button>
        {this.state.image ? selfie : ''}
      </div>
    );
  }
}

export default UploadAvatar;

