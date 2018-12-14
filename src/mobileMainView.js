import React, {Component} from 'react';
import MobileNavBar from './mobileNavBar';
import MobileGuessingScreen from './mobileGuessingScreen';
import MobileSubmitName from './mobileSubmitName';
import MobileVotes from './mobileVotes';


class MobileMainView extends Component {
  render() {

    return (
      <div>
        <MobileNavBar/>
        <MobileGuessingScreen/>
        <MobileSubmitName/>
        <MobileVotes/>
        <p>Hello Main View for Mobile</p>
      </div>  
    );
  }
}
export default MobileMainView;