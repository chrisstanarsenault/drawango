import React, {Component} from 'react';
import Votes from './mobileVotes';

class MobileVotesScreen extends Component {

  render() {

    const guesses = this.props.gameData.players.map(player => (
      <Votes key={player.name} guess={this.props.gameData.playerGuess[player.name]}/>
      ));

    return (
      <div>
        {guesses}
      </div>
    );
  }
}
export default MobileVotesScreen;