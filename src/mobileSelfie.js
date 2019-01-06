import React from 'react';
import CameraPhoto, { FACING_MODES } from 'jslib-html5-camera-photo';

class SelfieCamera extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.cameraPhoto = null;
    this.videoRef = React.createRef();
    this.state = {
      dataUri: ''
    }
  }

  componentDidMount () {
    // We need to instantiate CameraPhoto inside componentDidMount because we
    // need the refs.video to get the videoElement so the component has to be
    // mounted.
    this.cameraPhoto = new CameraPhoto(this.videoRef.current);
    this.initiateCamera();

  }

  startCamera (idealFacingMode, idealResolution) {
    this.cameraPhoto.startCamera(idealFacingMode, idealResolution)
      .then(() => {
        console.log('camera is started !');
      })
      .catch((error) => {
        console.error('Camera not started!', error);
      });
  }

  takePhoto () {
    const config = {
      sizeFactor: 0.75
    };

    let dataUri = this.cameraPhoto.getDataUri(config);
    console.log('DataUri of the photo:', dataUri)
    this.setState({ dataUri });
  }

  stopCamera () {
    this.cameraPhoto.stopCamera()
      .then(() => {
        console.log('Camera stoped!');
      })
      .catch((error) => {
        console.log('No camera to stop!:', error);
      });
  }
  initiateCamera() {
    let facingMode = FACING_MODES.USER;
    let idealResolution = { width: 240, height: 240 };
    this.startCamera(facingMode, idealResolution);
  }

  render () {
    const video = <video
      ref={this.videoRef}
      autoPlay='true'
      />
    const selfie = <img
      alt="imgCamera"
      src={this.state.dataUri}
      height="120px"
      />
    const validate = <button onClick={ () => {
      this.props.addAvatar(this.props.gameData.mainPlayer, this.state.dataUri)
    }}>Confirm</button>

    return (
      <div className="mobile-video-container">
        {video}
        <div>
          <button onClick={ () => {
            this.takePhoto();
          }}> Take photo </button>
          {this.state.dataUri ? validate : ''}
        </div>
        <div className="mobile-selfie-container">
          {this.state.dataUri ? selfie : ''}
        </div>
      </div>
    );
  }
}

export default SelfieCamera;