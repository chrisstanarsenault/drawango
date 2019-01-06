import React, {Component} from 'react';


class UploadAvatar extends Component {

  constructor (props) {
    super(props);
    this.state = {files: '', selectedImage: null, image: null}
    }
  

fileChangedHandler = (event) => {
  this.setState({selectedImage: event.target.files[0]})
}

uploadHandler = () => { 
  let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(this.state.selectedImage);

      // on reader load somthing...
      reader.onload = () => {

        this.setState({image: reader.result})
        console.log("datauri :", this.state.image)
        }

}

getFiles(files){
  this.setState({ files: files })
}
  render() {
    const selfie = <img alt="avatar" src={this.state.image} />
  

    return (
      <div>
      <button>fake</button>
      <button>fake</button>
      <button>fake</button>
      <button>fake</button>
      <input type="file" onChange={this.fileChangedHandler} />
       <button onClick={this.uploadHandler}>Upload!</button>
        {this.state.image ? selfie : ''}
        <div className="text-center">
        {this.state.files}
        </div>
      </div>
    );
  }
}

export default UploadAvatar;

