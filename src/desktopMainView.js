import React, {Component} from 'react';
import Welcome from './desktopWelcomeScreen'
import Timer from './desktopTimerFooter'

class DesktopMainView extends Component {
  render() {
    return (
      <div>
        <p>"Hello desktop user"</p>
        <p>Current stage {this.props.stage.gameStage} </p>
        <Welcome changeGameStage={this.props.changeGameStage}/>
        <Timer />
      </div>
    );
  }
}
export default DesktopMainView;