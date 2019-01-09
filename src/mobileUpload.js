import React, {Component} from 'react';


class UploadAvatar extends Component {

  constructor (props) {
    super(props);
    this.state = {selectedImage: null, image: null, error: ''}
    }


fileChangedHandler = (event) => {
  this.setState({selectedImage: event.target.files[0]})
}

uploadHandler = () => {
  if (this.state.selectedImage) {
    this.setState({error : ''});
    const reader = new FileReader();
    reader.readAsDataURL(this.state.selectedImage);
    
    
    reader.onload = () => {
         const data = reader.result
         this.setState({image: data})
 
    }
  } else {
    this.setState({error : 'Please select a picture to upload'});
  }
}

getFiles(files){
  this.setState({ files: files })
}
  render() {
    const validate = <div className="mobile-confirm-upload">
    <img alt="avatar" src={this.state.image} width="240px" />
    <button onClick={ () => {
      this.props.addAvatar(this.props.gameData.mainPlayer, this.state.image)
    }}>Confirm</button>

    </div>;

    return (
      <div className="mobile-upload-container">
      <p id="error">{this.state.error}</p>
      <div className="mobile-test">
      <input type="file" onChange={this.fileChangedHandler} />
      <button onClick={this.uploadHandler}>Upload!</button>
      </div>
      <div>
              {this.state.image ? validate : ''}
      </div>
      </div>
    );
  }
}

export default UploadAvatar;

