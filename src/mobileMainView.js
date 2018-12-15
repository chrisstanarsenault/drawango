import React, {Component} from 'react';
import MobileNavBar from './mobileNavBar';
import MobileGuessingScreen from './mobileGuessingScreen';
import MobileSubmitName from './mobileSubmitName';
import MobileVotes from './mobileVotes';
import Canvas from './canvas';

class MobileMainView extends Component {
  
  render() {

    return (
      <div>
        <MobileNavBar/>
        <MobileGuessingScreen/>
        <MobileSubmitName/>
        <MobileVotes/>
        <Canvas />
        <p>Hello Main View for Mobile</p>
      </div>  
    );
  }
}
export default MobileMainView;