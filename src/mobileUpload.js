import React, {Component} from 'react';


class UploadAvatar extends Component {

  constructor (props) {
    super(props);
    this.state = {selectedImage: null, image: null}
    }
  

fileChangedHandler = (event) => {
  this.setState({selectedImage: event.target.files[0]})
}

uploadHandler = () => { 
  const reader = new FileReader();
  reader.readAsDataURL(this.state.selectedImage);
  reader.onload = () => {
    this.setState({image: reader.result})
    console.log("datauri :", this.state.image)
  }

}

getFiles(files){
  this.setState({ files: files })
}
  render() {
    const validate = <div><button onClick={ () => {
      this.props.addAvatar(this.props.gameData.mainPlayer, this.state.image)
    }}>Confirm</button>
    <img alt="avatar" src={this.state.image} width="240px" />
    </div>;

    return (
      <div>
    
      <input type="file" onChange={this.fileChangedHandler} />
       <button onClick={this.uploadHandler}>Upload!</button>
        {this.state.image ? validate : ''}
        <div className="text-center">
        {this.state.files}
        </div>
      </div>
    );
  }
}

export default UploadAvatar;

