import React, {Component} from 'react';
import Votes from './mobileVotes';

class MobileVotesScreen extends Component {

  render() {
    console.log("votescreenbitches", this.props.gameData.playerGuess);
    const guesses = this.props.gameData.players.map(player => (
      <Votes key={player.name} guess={this.props.gameData.playerGuess[player.name]}/>
      ));
    // if (this.props.gameData.mainPlayer){
    //   return (
    //     <div>
    //       <p> default page</p>
    //     </div>
    //   );
    // }
    console.log("mobile votes", guesses);
    //));
    return (
      <div>
        {guesses}
      </div>
    );
  }
}
export default MobileVotesScreen;